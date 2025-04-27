import { AppDataSource } from '@/config/database';
import { RefreshToken } from '@/models/RefreshToken';
import { User } from '@/models/User';

const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

export const createRefreshToken = async (token: string, user: User, expiresAt: Date) => {
  const refreshToken = refreshTokenRepository.create({
    token,
    user,
    expiresAt,
  });
  return await refreshTokenRepository.save(refreshToken);
};

export const findRefreshToken = async (token: string) => {
  return await refreshTokenRepository.findOne({
    where: { token },
    relations: ['user'],
  });
};

export const revokeRefreshToken = async (token: string) => {
  const refreshToken = await findRefreshToken(token);
  if (refreshToken) {
    refreshToken.isRevoked = true;
    await refreshTokenRepository.save(refreshToken);
  }
};

export const deleteRefreshToken = async (token: string) => {
  await refreshTokenRepository.delete({ token });
};

// Revocar todos los refresh tokens de un usuario
export const revokeAllRefreshTokensForUser = async (userId: number) => {
  const tokens = await refreshTokenRepository.find({
    where: {
      user: {
        id: userId,
      },
      isRevoked: false,
    },
    relations: ['user'],
  });

  for (const token of tokens) {
    token.isRevoked = true;
  }

  await refreshTokenRepository.save(tokens);
};

