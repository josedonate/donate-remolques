import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'
import catalogoRoutes from './routes/catalogo.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());

// Servir archivos estáticos de /3Dmodels
app.use('/3Dmodels', express.static(path.join(__dirname, '../public/3Dmodels')));

// Servir archivos estáticos de /miniaturasRemolques para las tarjetas de remolques del frontend
app.use('/miniaturasRemolques', express.static(path.join(__dirname, '../public/miniaturasRemolques')));


// Configurar CORS para permitir el acceso desde el frontend
app.use(cors({ origin: process.env.FRONTEND_URL }))

// Rutas de la api
app.use('/api', catalogoRoutes);


// Middleware de errores
app.use(errorHandler);

export default app;