import { validate } from 'class-validator';
import { User } from '../models/user.entity';

/**
 * Valida una instancia de User usando class-validator.
 * @param user - Instancia de User que quieres validar.
 * @throws Error si la validación falla.
 */
export async function validateUser(user: User): Promise<void> {
  const errors = await validate(user, {
    whitelist: true,          // Elimina propiedades que no están decoradas
    forbidNonWhitelisted: true, // Lanza error si hay propiedades desconocidas
  });

  if (errors.length > 0) {
    const messages = errors.flatMap(err => Object.values(err.constraints ?? {}));
    throw new Error(messages.join(', '));
  }
}
