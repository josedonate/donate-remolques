import { z } from 'zod';

export const configuracionSchema = z.object({
  tipo: z.enum(['normal', 'basculante']),

  dimensiones: z.object({
    ancho: z.number().int().positive(),
    largo: z.number().int().positive(),
    alto: z.number().int().positive()
  }),

  mma: z.number().int().positive(),

  numeroEjes: z.union([z.literal(1), z.literal(2)]),

  kgPorEje: z.number().int().positive(),

  freno: z.boolean(),

  ruedas: z.object({
    pulgadasLlanta: z.string(),
    numeracionNeumatico: z.string(),
    localizacionRuedas: z.enum(['porfuera', 'pordebajo'])
  }),

  sistemaBasculante: z.enum(['manual', 'electrico']).optional(),

  luces: z.enum(['estandar', 'led']),

  opcionales: z.object({
    sobrelaterales: z.enum(['rejilla', 'chapa']).optional(),
    toldo: z.boolean().optional(),
    apoyatableros: z.boolean().optional(),
    tapadera: z.boolean().optional(),
    rampas: z.boolean().optional()
  }).optional()
});
