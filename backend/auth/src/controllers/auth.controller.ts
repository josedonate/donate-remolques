import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import passport from 'passport';

const authService = new AuthService();

/**
 * POST /auth/register
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await authService.register(firstName, lastName, email, password);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/login
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /auth/profile
 * Ruta protegida con JWT
 */
export const profile = [
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.getProfile((req.user as any).id);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  },
];
