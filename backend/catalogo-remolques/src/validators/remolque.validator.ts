import { z } from 'zod';
import { Dimensiones, Ejes, Rueda, MMA, TipoSobrelateral } from '../models/Remolque';

export const remolqueSchema = z.object({
  familia: z.string(),
  referencia: z.string(),

  dimensiones: z.object({
    ancho: z.number(),
    largo: z.number(),
    alto: z.number().optional(),
  }).strict(),

  mma: z.enum(['<=750kg', '(750kg-3500kg]']),

  ejes: z.object({
    numeroEjes: z.number(),
    kgPorEje: z.number(),
  }).strict(),

  freno: z.boolean(),
  basculante: z.boolean(),
  ruedaJockey: z.boolean(),

  rueda: z.object({
    pulgadasLlanta: z.number(),
    numeracionNeumatico: z.string(),
  }).strict(),

  // Opcionales correctamente definidos
  sobrelaterales: z.enum(['chapa', 'rejilla']).optional(),
  toldo: z.boolean().optional(),
  tapadera: z.boolean().optional(),
  rampas: z.boolean().optional(),
  apoyaTableros: z.boolean().optional(),

  urlModelo3D: z.string(),
});

export type RemolqueInput = z.infer<typeof remolqueSchema>;
