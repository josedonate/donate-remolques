import jwt, { SignOptions, Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET ?? 'supersecret';
const JWT_EXPIRES_IN: number = process.env.JWT_EXPIRES_IN
  ? Number(process.env.JWT_EXPIRES_IN)
  : 3600;  // 1 hora

const JWT_REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET ?? 'supersecretrefresh';
const JWT_REFRESH_EXPIRES_IN: number = process.env.JWT_REFRESH_EXPIRES_IN
  ? Number(process.env.JWT_REFRESH_EXPIRES_IN)
  : 604800;  // 7 días

export interface JwtPayload {
  sub: number;
  email: string;
  roles: string[];
}

// Generar Access Token
export const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

// Verificar Access Token
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;
};

// Generar Refresh Token
export const generateRefreshToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  };
  return jwt.sign(payload, JWT_REFRESH_SECRET, options);
};

// Verificar Refresh Token
export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as unknown as JwtPayload;
};
