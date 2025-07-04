/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import { UserResponse, UsersResponse, UserUpdateRequest } from "@/types/user";
import { isAxiosError } from "axios";

export const getUserByIdFn = async (userId: string) => {
  try {
    const response = await api.get<UserResponse>(`/users/${userId}`);
    if (!response.data) {
      throw new Error("Failed to get user by id");
    }
    return response.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }

    throw new Error(error);
  }
};

export const getTweetByUserIdFn = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export const updateUserFn = async (payload: UserUpdateRequest) => {
  try {
    const response = await api.patch(`/users/${payload.id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export const getAllUserFn = async (search: string) => {
  try {
    const response = await api.get<UsersResponse>(`/users?search=${search}`);

    return response.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    console.error(error);
    throw new Error("Unknown Error");
  }
};
