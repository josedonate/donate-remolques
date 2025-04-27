import { Router } from 'express';
import { getProfile } from '@/controllers/user.controller';
import { authenticateJWT } from '@/middlewares/authenticateJWT';

const router = Router();

// Ruta protegida: Solo usuarios autenticados pueden acceder
router.get('/me', authenticateJWT, getProfile);

export default router;
