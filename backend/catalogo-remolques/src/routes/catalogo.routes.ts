import { Router } from 'express';
import * as catalogoController from '../controllers/catalogo.controller';

const router = Router();

router.get('/remolques', catalogoController.obtenerRemolques);
router.get('/remolques/:id', catalogoController.obtenerRemolquePorId);
router.post('/remolques', catalogoController.crearRemolque);
router.delete('/remolques/:id', catalogoController.eliminarRemolquePorId);
router.put('/remolques/:id', catalogoController.actualizarRemolquePorId);
router.patch('/remolques/:id', catalogoController.modificarParcialmenteRemolque);


export default router;
