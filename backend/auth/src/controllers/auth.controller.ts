import { Request, Response, NextFunction } from 'express';
import { registerUserSchema, loginUserSchema } from '@/validators/user.validator';
import { getUserByEmail, createUser } from '@/services/auth.service';
import passport from 'passport';
import { hashPassword } from '@/utils/password.util';
import { generateToken, JwtPayload } from '@/utils/jwt.util';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = registerUserSchema.parse(req.body);

    const existingUser = await getUserByEmail(validatedData.email);
    if (existingUser) {
      res.status(409).json({ message: 'Ya existe una cuenta con este correo' });
      return;
    }

    const passwordHash = await hashPassword(validatedData.password);

    const newUser = await createUser(
      validatedData.firstName,
      validatedData.lastName,
      validatedData.email,
      passwordHash
    );

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local', { session: false }, (err: any, user: any, info: any)  => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || 'Credenciales incorrectos' });
    }

    const payload: JwtPayload = { // Claims del token
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const token = generateToken(payload);

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
    });
  })(req, res, next);
};


