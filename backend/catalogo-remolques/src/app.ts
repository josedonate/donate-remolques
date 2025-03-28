import express from 'express';
import dotenv from 'dotenv';
import catalogoRoutes from './routes/catalogo.routes';

dotenv.config();

const app = express();

app.use(express.json()); // Para leer JSON en las peticiones
app.use('/api', catalogoRoutes); // Usa las rutas bajo /api

export default app;
