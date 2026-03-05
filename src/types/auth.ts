export interface RegisterUserRequest {
  name: string;
  username?: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisteredUser {
  id: string;
  name: string;
  username?: string;
  email: string;
}

export interface RegisterUserResponse {
  status: string;
  data: {
    user: RegisteredUser;
  };
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  status: string;
  access_token: string;
}

export interface RefreshTokenUserResponse {
  status: string;
  access_token: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface MeResponse {
  status: string;
  data: {
    user: {
      id: string;
      name: string;
      photoProfile: string;
      username: string;
      email: string;
      role: string;
      bio?: string;
      provider: string | null;
      banner: string | null;
    };
  };
}

export interface AuthUserStore {
  authUser: MeResponse | null;
  loading: boolean;
  setAuthUser: (user: MeResponse | null) => void;
  setLoading: (loading: boolean) => void;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  passwordConfirm: string;
}
