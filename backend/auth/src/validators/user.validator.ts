// src/validators/user.validator.ts
import { z } from 'zod';

export const registerUserSchema = z.object({
    firstName: z.string().max(20, 'El nombre tiene que tener menos de 20 caracteres'),
    lastName: z.string().max(20, 'El apellido tiene que tener menos de 20 caracteres'),
    email: z.string().email('Dirección de email inválida'),
    password: z.string().min(6, 'La contraseña tiene que tener al menos 6 caracteres'),
});

export const loginUserSchema = z.object({
    email: z.string().email('Dirección de email inválida'),
    password: z.string().min(1, 'Contraseña obligatoria'),
});

// Tipos de TypeScript automáticos
export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;
