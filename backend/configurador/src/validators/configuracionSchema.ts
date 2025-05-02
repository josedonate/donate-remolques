import { z } from 'zod';

export const configuracionSchema = z.object({
  tipo: z.enum(['Normal', 'Basculante']),
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
    pulgadasLlanta: z.string(), // Ej: '14'
    numeracionNeumatico: z.string(), // Ej: '185R14C'
    localizacionRuedas: z.enum(['porFuera', 'porDebajo'])
  }),  
  sistemaBasculante: z.enum(['Manual', 'Eléctrico']).optional(),
  luces: z.enum(['Estándar', 'Led']),
  opcionales: z.object({
    sobrelaterales: z.enum(['Rejilla', 'Chapa']).optional(),
    toldo: z.boolean().optional(),
    apoyatableros: z.boolean().optional(),
    tapadera: z.boolean().optional(),
    rampas: z.boolean().optional()
  }).optional()
});
