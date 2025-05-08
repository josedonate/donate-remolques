import axiosAuth from '@/lib/axiosAuth';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

//export interface RegisterResponse extends UserDTO {}

// Registro de usuario
export const register = (data: RegisterDTO): Promise<UserDTO> =>
  axiosAuth.post<UserDTO>('/register', data).then(res => res.data);

// Inicio de sesión
export const login = (data: LoginDTO): Promise<LoginResponse> =>
  axiosAuth.post<LoginResponse>('/login', data).then(res => res.data);

// Refrescar access token
export const refreshToken = (refreshToken: string): Promise<RefreshResponse> =>
  axiosAuth.post<RefreshResponse>('/refresh-token', { refreshToken }).then(res => res.data);

// Cerrar sesión
export const logout = (
  refreshToken: string,
  accessToken: string
): Promise<{ message: string }> =>
  axiosAuth
    .post<{ message: string }>(
      '/logout',
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(res => res.data);



// Cerrar todas las sesiones
export const logoutAll = (): Promise<{ message: string }> =>
  axiosAuth.post<{ message: string }>('/logout-all').then(res => res.data);

export const getMe = (accessToken: string): Promise<UserDTO> =>
  axiosAuth
    .get<UserDTO>('/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data);