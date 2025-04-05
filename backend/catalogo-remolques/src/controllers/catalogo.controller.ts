import { Request, Response, NextFunction } from 'express';
import * as catalogoService from '../services/catalogo.service';
import { remolqueSchema } from '../validators/remolque.validator';

export const obtenerRemolques = async (_req: Request, res: Response) => {
  const remolques = await catalogoService.obtenerRemolques();
  res.json(remolques);
};

export const crearRemolque = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = remolqueSchema.parse(req.body); // Aquí verificamos que los datos son válidos
    // Si no son válidos, se lanzará un error y se pasará al middleware de manejo de errores
    const nuevoRemolque = await catalogoService.crearRemolque(data);
    res.status(201).json(nuevoRemolque);
  } catch (error) {
    next(error); // delegamos al errorHandler
  }
};

export const obtenerRemolquePorId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "El ID debe ser un número entero" });
      return
    }

    const remolque = await catalogoService.obtenerRemolquePorId(id);

    if (!remolque) {
      res.status(404).json({ error: "Remolque no encontrado" });
      return
    }

    res.json(remolque);
  } catch (error) {
    next(error); // delegamos al errorHandler
  }
};

export const eliminarRemolquePorId = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "El ID debe ser un número entero" });
      return;
    }

    const eliminado = await catalogoService.eliminarRemolquePorId(id);

    if (!eliminado) {
      res.status(404).json({ error: "Remolque no encontrado" });
      return;
    }

    res.status(204).send(); // 204: No Content (eliminado correctamente)
  } catch (error) {
    next(error);
  }
};

export const actualizarRemolquePorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "El ID debe ser un número entero" });
      return;
    }

    const data = remolqueSchema.parse(req.body);

    const actualizado = await catalogoService.actualizarRemolquePorId(id, data);

    if (!actualizado) {
      res.status(404).json({ error: "Remolque no encontrado" });
      return;
    }

    res.json(actualizado);
  } catch (error) {
    next(error);
  }
};
