import { Request, Response, NextFunction } from 'express';
import * as catalogoService from '../services/catalogo.service';
import { remolqueSchema } from '../validators/remolque.validator';
import { remolqueParcialSchema } from "../validators/remolque.validator";
import { toRemolqueTarjetaDTO, toRemolqueDTO } from '../mappers/remolque.mapper';

export const obtenerRemolques = async (_req: Request, res: Response) => {
  const remolques = await catalogoService.obtenerRemolques();
  res.json(remolques);
};

export const obtenerRemolquesTarjeta = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const sort = req.query.sort as string | undefined;
  const direction = (req.query.direction as "asc" | "desc") || "asc";


  const filtros = {
    familia: req.query.familia as string | undefined,
    mma: req.query.mma ? parseInt(req.query.mma as string) : undefined,
    ejes: req.query.ejes ? parseInt(req.query.ejes as string) : undefined,
  };

  const { remolques, total } = await catalogoService.obtenerRemolquesFiltrados(page, limit, filtros, sort, direction);  
  const dtos = remolques.map(toRemolqueTarjetaDTO);

  res.json({
    content: dtos,
    totalElements: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
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
      return;
    }

    const remolque = await catalogoService.obtenerRemolquePorId(id);

    if (!remolque) {
      res.status(404).json({ error: "Remolque no encontrado" });
      return;
    }

    res.json(toRemolqueDTO(remolque));
  } catch (error) {
    next(error);
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

export const modificarParcialmenteRemolque = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "El ID debe ser un número entero" });
      return
    }

    const data = remolqueParcialSchema.parse(req.body); // ✅ validación parcial

    const actualizado = await catalogoService.actualizarRemolquePorId(id, data);
    if (!actualizado) {
      res.status(404).json({ error: "Remolque no encontrado" });
      return
    }

    res.json(actualizado);
  } catch (error) {
    next(error);
  }
};
