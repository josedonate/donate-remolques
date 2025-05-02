import express from 'express';
import configuradorRoutes from './routes/configurador.routes';

const app = express();

app.use(express.json());
app.use('/configurador', configuradorRoutes);

export default app;
