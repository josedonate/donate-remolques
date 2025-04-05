import { z } from 'zod';

export const dimensionesSchema = z.object({
  ancho: z.number(),
  largo: z.number(),
  alto: z.number().optional().nullable(),
});

export const ejesSchema = z.object({
  numeroEjes: z.number().int(),
  kgPorEje: z.number().int(),
});

export const ruedaSchema = z.object({
  pulgadasLlanta: z.number().int(),
  numeracionNeumatico: z.string(),
});

export const remolqueInputSchema = z.object({
  familia: z.string(),
  nombre: z.string(),
  dimensiones: dimensionesSchema,
  mma: z.enum(['<=750kg', '(750kg-3500kg]']),
  ejes: ejesSchema,
  freno: z.boolean(),
  basculante: z.boolean(),
  ruedaJockey: z.boolean(),
  rueda: ruedaSchema,
  sobrelaterales: z.string().optional().nullable(),
  toldo: z.boolean(),
  tapadera: z.boolean(),
  apoyaTableros: z.boolean(),
  urlModelo3D: z.string(), // permitimos cualquier string
});

export type RemolqueInput = z.infer<typeof remolqueInputSchema>;
