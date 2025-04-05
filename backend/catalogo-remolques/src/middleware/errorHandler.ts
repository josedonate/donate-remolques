import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ReglaNegocioError } from "../errors/ReglaNegocioError";

// Middleware de manejo de errores global
export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const detalles = err.errors.map((e) => ({
      campo: e.path.join('.'),
      mensaje: e.message,
    }));

    res.status(400).json({
      error: "Datos inválidos en la solicitud",
      detalles,
    });
    return;
  }

  if (err instanceof ReglaNegocioError) {
    res.status(400).json({
      error: "Regla de negocio no cumplida",
      mensaje: err.message,
    });
    return 
  }

  console.error("🔴 Error no controlado:", err);

  res.status(500).json({
    error: "Error interno del servidor",
    mensaje: err.message || "Algo salió mal",
  });
};