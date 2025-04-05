import { Request, Response, NextFunction } from 'express';
import CatalogoService from '../services/catalogo.service';
import { remolqueInputSchema } from '../validators/remolque.validator';

export const obtenerRemolquesCatalogo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const remolques = await CatalogoService.obtenerRemolques();
    res.status(200).json(remolques);
  } catch (error) {
    next(error);
  }
};

export const obtenerRemolquePorId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const remolque = await CatalogoService.obtenerRemolquePorId(id);
    if (!remolque) {
      res.status(404).json({ error: 'Remolque no encontrado' });
      return;
    }
    res.status(200).json(remolque);
  } catch (error) {
    next(error);
  }
};

export const crearRemolque = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const parsed = remolqueInputSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  try {
    const nuevo = await CatalogoService.crearRemolque(parsed.data);
    res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
};