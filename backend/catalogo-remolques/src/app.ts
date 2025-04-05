import express from 'express';
import dotenv from 'dotenv';
import catalogoRoutes from './routes/catalogo.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', catalogoRoutes);

app.use(errorHandler);

export default app;