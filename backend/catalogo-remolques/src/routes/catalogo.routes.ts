import { Router } from 'express';
import { obtenerRemolquesCatalogo } from '../controllers/catalogo.controller';

const router = Router();

// GET /api/remolques → Devuelve todos los remolques del catálogo
router.get('/remolques', obtenerRemolquesCatalogo);

export default router;
