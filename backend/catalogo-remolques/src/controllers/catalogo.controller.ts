import { Request, Response } from 'express';
import { Remolque } from '../models/Remolque';

const remolquesCatalogo: Remolque[] = [
  new Remolque(
    "1",
    "Plataforma",
    "Remolque Básico",
    { ancho: 1.2, largo: 2.5 },
    "<750kg",
    { numeroEjes: 1, kgPorEje: 750 },
    false,
    false,
    true,
    { pulgadasLlanta: 13, numeracionNeumatico: "165/70R13" },
    "ninguno",
    false,
    false,
    false,
    "/modelos/remolque1.glb"
  ),
  new Remolque(
    "2",
    "Ganadero",
    "Remolque Cerrado",
    { ancho: 1.4, largo: 3.0, alto: 1.2 },
    "750-3500kg",
    { numeroEjes: 2, kgPorEje: 1000 },
    true,
    true,
    true,
    { pulgadasLlanta: 14, numeracionNeumatico: "175/70R14" },
    "rejilla",
    true,
    true,
    true,
    "/modelos/remolque2.glb"
  )
];

export const obtenerRemolquesCatalogo = (req: Request, res: Response) => {
  res.status(200).json(remolquesCatalogo);
};
