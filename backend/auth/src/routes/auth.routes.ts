// src/routes/auth.routes.ts
import { Router } from "express";
import { register, login, refreshAccessToken, logout, logoutAll  } from "@/controllers/auth.controller";
import { authenticateJWT } from '@/middlewares/authenticateJWT';

const router = Router();

// Ruta de registro de usuarios
router.post("/register", register);
router.post("/login", login);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', authenticateJWT, logout);
router.post('/logout-all', authenticateJWT, logoutAll);



export default router;
