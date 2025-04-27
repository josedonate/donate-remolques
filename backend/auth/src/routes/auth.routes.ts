// src/routes/auth.routes.ts
import { Router } from "express";
import { register, login } from "@/controllers/auth.controller";

const router = Router();

// Ruta de registro de usuarios
router.post("/register", register);

// Ruta de inicio de sesión
router.post("/login", login);

export default router;
