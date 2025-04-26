import { Router } from 'express';
import passport from 'passport';
import { register, login, profile } from '../controllers/auth.controller';

const router = Router();

// POST /auth/register
router.post('/register', register);

// POST /auth/login
router.post('/login', login);

// GET /auth/profile (protegida con JWT)
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  profile
);

export default router;
