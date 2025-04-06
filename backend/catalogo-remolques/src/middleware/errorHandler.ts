import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ReglaNegocioError } from "../errors/ReglaNegocioError";
import { QueryFailedError } from "typeorm";

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

  // 🚨 Error por clave duplicada (referencia única)
  if (err instanceof QueryFailedError && (err as any).code === "23505") {
    res.status(409).json({
      error: "Referencia duplicada",
      mensaje: "Ya existe un remolque con esa referencia.",
    });
    return 
  }

  console.error("🔴 Error no controlado:", err);

  res.status(500).json({
    error: "Error interno del servidor",
    mensaje: err.message || "Algo salió mal",
  });
};