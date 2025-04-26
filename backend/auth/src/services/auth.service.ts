import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { User } from '../models/user.entity';
import { hashPassword, verifyPassword } from '../utils/password.util';
import { generateToken, JwtPayload } from '../utils/jwt.util';
import { validateUser } from '../utils/validateUser';

export class AuthService {
  private readonly userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  /**
   * Registra un nuevo usuario con nombre y apellidos.
   * @throws Error si ya existe un usuario con ese email.
   */
  async register(firstName: string, lastName: string, email: string, plainPassword: string): Promise<User> {
    const existing = await this.userRepo.findOneBy({ email });
    if (existing) {
      throw new Error('Ya existe un usuario con ese email');
    }
  
    const passwordHash = await hashPassword(plainPassword);
    const user = this.userRepo.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });
    
    // Se valida al usuario antes de guardarlo
    await validateUser(user);
  
    return this.userRepo.save(user);
  }

  /**
   * Valida credenciales y retorna usuario + token JWT.
   * @throws Error si credenciales inválidas.
   */
  async login(
    email: string,
    plainPassword: string
  ): Promise<{ user: User; token: string }> {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    const valid = await verifyPassword(plainPassword, user.passwordHash);
    if (!valid) {
      throw new Error('Credenciales inválidas');
    }
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    const token = generateToken(payload);
    delete (user as any).passwordHash;
    return { user, token };
  }

  /**
   * Obtiene los datos del usuario por su ID.
   * @throws Error si el usuario no existe.
   */
  async getProfile(userId: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    delete (user as any).passwordHash;
    return user;
  }
}
