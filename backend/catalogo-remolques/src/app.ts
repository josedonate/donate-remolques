import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import catalogoRoutes from './routes/catalogo.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());

// 👉 Servir archivos estáticos de /3Dmodels
app.use('/3Dmodels', express.static(path.join(__dirname, '../public/3Dmodels')));

// Rutas de la api
app.use('/api', catalogoRoutes);

// Middleware de errores
app.use(errorHandler);

export default app;