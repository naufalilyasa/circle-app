import api from "@/lib/axios";
// Store mutations removed from API layer
import {
  GenericResponse,
  LoginUserRequest,
  LoginUserResponse,
  MeResponse,
  RefreshTokenUserResponse,
  RegisterUserRequest,
  ResetPasswordRequest,
} from "@/types/auth";
import { isAxiosError } from "axios";

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;

    try {
      if (
        errMessage.includes("You're not logged in") &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        await refreshTokenFn();

        return api(originalRequest);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data.message === "Could not refresh access token") {
          return Promise.reject(new Error("You're not logged in"));
        }
        return Promise.reject(
          new Error(error.response?.data.message || "Server internal error")
        );
      }
      return Promise.reject(new Error("Server internal error."));
    }

    return Promise.reject(error);
  }
);

export const signUpUserFn = async (userInput: RegisterUserRequest) => {
  try {
    const response = await api.post<GenericResponse>(
      "/auth/register",
      userInput
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error("Unknown error");
  }
};

export const loginUserFn = async (userInput: LoginUserRequest) => {
  try {
    const response = await api.post<LoginUserResponse>(
      "/auth/login",
      userInput
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error("Unknown error");
  }
};

export const verifyEmailFn = async (verificationCode: string) => {
  const response = await api.get<GenericResponse>(
    `/auth/verifycode/${verificationCode}`
  );
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await api.post<GenericResponse>("/auth/logout");
  return response.data;
};

export const getMeFn = async (): Promise<MeResponse | undefined> => {
  try {
    const response = await api.get<MeResponse>("/users/me");

    // Store mutation should be performed by the consumer (e.g. via onSuccess hook or loader)
    // removed setAuthUser call here

    if (!response.data) {
      throw new Error("Invalid token or token expires");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message || "Unknown error");
    }
    throw new Error("Server internal error");
  }
};

export const refreshTokenFn = async (): Promise<
  RefreshTokenUserResponse | undefined
> => {
  try {
    const response = await api.get<RefreshTokenUserResponse>("/auth/refresh");

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error("Server internal error");
  }
};

export const forgotPasswordFn = async (email: string) => {
  const response = await api.post<GenericResponse>("/auth/forgotPassword", {
    email,
  });
  return response.data;
};

export const resetPasswordFn = async (
  data: ResetPasswordRequest,
  resetCode: string
) => {
  try {
    const response = await api.patch<GenericResponse>(
      `/auth/resetPassword/${resetCode}`,
      data
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error("Unknown error");
  }
};
