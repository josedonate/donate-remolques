// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const detalles = err.errors.map((e) => ({
      campo: e.path.join("."),
      mensaje: e.message,
    }));

    res.status(400).json({
      error: "Datos inválidos en la solicitud",
      detalles,
    });
    return;
  }
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
};
