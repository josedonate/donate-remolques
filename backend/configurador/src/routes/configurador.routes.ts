import { Router } from 'express';
import { getConfiguracionInicial, postConfiguracion } from '../controllers/configurador.controller';

const router = Router();

router.get('/configurador', getConfiguracionInicial);
router.post('/configurador', postConfiguracion);

export default router;
