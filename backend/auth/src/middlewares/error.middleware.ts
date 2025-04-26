// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.statusCode ?? 500;
  const message = err.message ?? 'Internal Server Error';

  // En desarrollo podríamos enviar stack: err.stack
  res.status(status).json({ error: message });
}
