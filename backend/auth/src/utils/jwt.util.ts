import jwt, { SignOptions, Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET ?? 'supersecret';
// Lo leemos de .env en segundos y lo convertimos a number
const JWT_EXPIRES_IN: number = process.env.JWT_EXPIRES_IN
  ? Number(process.env.JWT_EXPIRES_IN)
  : 3600;  // 3600 segundos = 1 hora

export interface JwtPayload {
  sub: number;
  email: string;
  roles: string[];
}

export const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;
};
