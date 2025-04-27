import { User } from '@/models/User';
import { UserDTO } from '@/dtos/user.dto';

export const toUserDTO = (user: User): UserDTO => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  roles: user.roles,
});
