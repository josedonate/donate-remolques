export interface User {
    id: number;
    nombre: string;
    email: string;
    password_hash: string;
    rol: 'user' | 'admin';
    created_at: Date;
  }