import { Router } from 'express';
import { procesarConfiguracion } from '../controllers/configurador.controller';

const router = Router();

router.post('/', procesarConfiguracion);

export default router;
