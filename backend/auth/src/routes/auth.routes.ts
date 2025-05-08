// src/routes/auth.routes.ts
import { Router } from "express";
import { register, login, refreshAccessToken, logout, logoutAll  } from "@/controllers/auth.controller";
import { authenticateJWT } from '@/middlewares/authenticateJWT';
import { getProfile } from '@/controllers/user.controller';

const router = Router();

// Ruta de registro de usuarios
router.post("/register", register);
router.post("/login", login);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', authenticateJWT, logout);
router.post('/logout-all', authenticateJWT, logoutAll);

router.get('/me', authenticateJWT, getProfile);


export default router;
