import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { registerUserSchema } from '@/validators/user.validator';
import { getUserByEmail, createUser } from '@/services/auth.service';
import { hashPassword } from '@/utils/password.util';
import { generateToken, generateRefreshToken, verifyRefreshToken, JwtPayload } from '@/utils/jwt.util';
import { createRefreshToken, findRefreshToken, revokeRefreshToken, revokeAllRefreshTokensForUser  } from '@/services/refreshToken.service';
import { toUserDTO } from '@/mappers/user.mapper';


export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = registerUserSchema.parse(req.body);

    const existingUser = await getUserByEmail(validatedData.email);
    if (existingUser) {
      res.status(409).json({ message: 'Este email ya está registrado' });
      return;
    }

    const passwordHash = await hashPassword(validatedData.password);
    const newUser = await createUser(
      validatedData.firstName,
      validatedData.lastName,
      validatedData.email,
      passwordHash
    );

    const userDTO = toUserDTO(newUser);

    res.status(201).json(userDTO);
  } catch (error) {
    next(error);
  }
};

export const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local', { session: false }, async (err: any, user: any, info: any) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || 'Credenciales incorrectos' });
      }

      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        roles: user.roles,
      };

      const accessToken = generateToken(payload);
      const refreshToken = generateRefreshToken(payload);

      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + Number(process.env.JWT_REFRESH_EXPIRES_IN) || 604800);

      // Guardamos refresh token en base de datos
      await createRefreshToken(refreshToken, user, expiresAt);

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};


// Refrescar access token
export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token requerido' });
      return;
    }

    const storedToken = await findRefreshToken(refreshToken);

    if (!storedToken || storedToken.isRevoked) {
      res.status(401).json({ message: 'Refresh token inválido o revocado' });
      return;
    }

    // Verificamos que el JWT es válido y no ha expirado
    const payload = verifyRefreshToken(refreshToken);

    const newAccessToken = generateToken({
      sub: payload.sub,
      email: payload.email,
      roles: payload.roles,
    });

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token requerido para cerrar sesión' });
      return;
    }

    const storedToken = await findRefreshToken(refreshToken);

    if (!storedToken) {
      // No filtramos si existe o no, para no revelar información sobre tokens válidos
      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
      return;
    }

    const user = req.user as any;

    if (storedToken.user.id !== user.id) {
      res.status(403).json({ message: 'No tienes permiso para cerrar esta sesión' });
      return;
    }

    await revokeRefreshToken(refreshToken);

    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    next(error);
  }
};

export const logoutAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user as any;

    await revokeAllRefreshTokensForUser(user.sub);

    res.status(200).json({ message: 'Todas las sesiones han sido cerradas exitosamente' });
  } catch (error) {
    next(error);
  }
};
