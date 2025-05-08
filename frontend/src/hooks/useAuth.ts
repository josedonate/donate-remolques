import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authService from "@/services/authService";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      login: async (email, password) => {
        const { accessToken, refreshToken } = await authService.login({
          email,
          password,
        });

        const user = await authService.getMe(accessToken);

        set({
          accessToken,
          refreshToken,
          user,
        });
      },

      register: async (firstName, lastName, email, password) => {
        await authService.register({ firstName, lastName, email, password });
        // Opcional: login automático tras registro
        await get().login(email, password);
      },

      logout: async () => {
        const { refreshToken, accessToken } = get();

        try {
          if (refreshToken && accessToken) {
            await authService.logout(refreshToken, accessToken);
          }
        } catch {
          console.warn("Error al cerrar sesión. Token inválido o expirado.");
        }

        set({ user: null, accessToken: null, refreshToken: null });
      },

      refreshSession: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) return;

        try {
          const { accessToken: newAccessToken } =
            await authService.refreshToken(refreshToken);
          const payload = JSON.parse(atob(newAccessToken.split(".")[1]));
          set({
            accessToken: newAccessToken,
            user: {
              id: payload.sub,
              email: payload.email,
              roles: payload.roles,
              firstName: "",
              lastName: "",
            },
          });
        } catch {
          set({ user: null, accessToken: null, refreshToken: null });
        }
      },

      setUser: (user: User) => set({ user }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
