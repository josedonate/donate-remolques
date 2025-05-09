// Validamos el tipo de los datos que nos llegan a la API para asegurarnos de que son correctos
// y que no se cuelan datos inválidos en la BBDD. Esto es importante para evitar errores en el frontend
// y asegurar que los datos son correctos antes de guardarlos en la base de datos.

import { z } from 'zod';
import { FAMILIAS } from "../utils/familiasUsosRemolques";
import {
  Dimensiones,
  Ejes,
  Rueda,
  LocalizacionRuedas,
  TipoSobrelateral
} from '../models/Remolque';
import { url } from 'inspector';

// Esquema completo para creación de remolques
export const remolqueSchema = z.object({
  familia: z.enum(FAMILIAS),
  referencia: z.string(),

  dimensiones: z.object({
    ancho: z.number(),
    largo: z.number(),
    alto: z.number().optional(),
  }).strict(),

  tara: z.number(),

  mma: z.union([
    z.literal(300),
    z.literal(500),
    z.literal(650),
    z.literal(750),
    z.literal(1000),
    z.literal(1300),
    z.literal(1600),
    z.literal(2000),
    z.literal(2500),
    z.literal(3000),
    z.literal(3500),
  ]),

  ejes: z.object({
    numeroEjes: z.number(),
    kgPorEje: z.number(),
  }).strict(),

  rueda: z.object({
    pulgadasLlanta: z.number(),
    numeracionNeumatico: z.string(),
    localizacionRuedas: z.enum(['porFuera', 'porDebajo']),
  }).strict(),

  freno: z.boolean(),
  basculante: z.boolean(),
  ruedaJockey: z.boolean(),

  sobrelaterales: z.enum(['chapa', 'rejilla']).optional(),
  toldo: z.boolean().optional(),
  tapadera: z.boolean().optional(),
  rampas: z.boolean().optional(),
  apoyaTableros: z.boolean().optional(),

  urlModelo3D: z.string(),
  urlImagen: z.string().url().optional(), // URL de la imagen del remolque
  descripcion: z.string().optional(), // Descripción del remolque
});

// Tipo TypeScript completo
export type RemolqueInput = z.infer<typeof remolqueSchema>;

// Esquema para PATCH (modificación parcial)
export const remolqueParcialSchema = remolqueSchema.partial();
export type RemolqueParcialInput = z.infer<typeof remolqueParcialSchema>;
