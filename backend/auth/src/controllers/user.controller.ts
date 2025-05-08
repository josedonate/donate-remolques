import { Request, Response } from 'express';

/**
 * Devuelve el perfil del usuario autenticado
 */
export const getProfile = (req: Request, res: Response): void => {
  const user = req.user as any;

  res.status(200).json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.roles,
  });
};

