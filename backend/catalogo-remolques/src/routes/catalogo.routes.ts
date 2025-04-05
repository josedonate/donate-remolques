import { Router } from 'express';
import { obtenerRemolquesCatalogo, obtenerRemolquePorId, crearRemolque } from '../controllers/catalogo.controller';

const router = Router();

router.get('/remolques', obtenerRemolquesCatalogo);
router.get('/remolques/:id', obtenerRemolquePorId);
router.post('/remolques', crearRemolque);

export default router;
