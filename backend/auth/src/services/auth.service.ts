// src/services/auth.service.ts
import { AppDataSource } from "@/config/database";
import { User } from "@/models/User";
import { toUserDTO } from '@/mappers/user.mapper';

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async () => {
  return await userRepository.find();
};

export const getUserById = async (id: number) => {
  const dbUser = await userRepository.findOneBy({ id });
  return dbUser ? toUserDTO(dbUser) : null;
};

export const getUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
  roles: string[] = ["user"]
) => {
  const user = userRepository.create({
    firstName,
    lastName,
    email,
    passwordHash,
    roles,
  });
  return await userRepository.save(user);
};
