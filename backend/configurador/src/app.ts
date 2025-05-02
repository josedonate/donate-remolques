import express from 'express';
import cors from 'cors';
import configuradorRoutes from './routes/configurador.routes';

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.use('/api', configuradorRoutes);

export default app;
