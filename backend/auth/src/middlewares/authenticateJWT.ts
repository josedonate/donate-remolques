// src/middlewares/authenticateJWT.ts
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    req.user = user; // Attach user al request
    next();
  })(req, res, next);
};
