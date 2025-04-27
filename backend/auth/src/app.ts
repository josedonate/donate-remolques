import express from 'express';
import dotenv from 'dotenv';
import passport from './config/passport';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import userRoutes from "@/routes/user.routes";

dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(passport.initialize());

// Rutas
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);

// Middleware de manejo de errores (debe ir al final)
app.use(errorMiddleware);

export default app;
