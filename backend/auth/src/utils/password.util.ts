import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hashea una contraseña en texto plano.
 * @param plainPassword - La contraseña que el usuario ha ingresado.
 * @returns El hash generado.
 */
export const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plainPassword, salt);
};

/**
 * Verifica que una contraseña en texto plano coincida con su hash.
 * @param plainPassword - La contraseña en texto claro.
 * @param passwordHash - El hash almacenado en la base de datos.
 * @returns true si coinciden, false si no.
 */
export const verifyPassword = async (
  plainPassword: string,
  passwordHash: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, passwordHash);
};
