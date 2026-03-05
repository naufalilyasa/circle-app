import api from "@/lib/axios";
import { GenericResponse } from "@/types/auth";
import {
  FollowRequest,
  SuggestedFollowersResponse,
  UnfollowRequest,
  UsersIsFollowerResponse,
  UsersIsFollowingResponse,
} from "@/types/follow";
import { isAxiosError } from "axios";

export const getUsersIsFollowingFn = async (userId: string) => {
  try {
    const response = await api.get<UsersIsFollowingResponse>(
      `/usersIsFollowing/${userId}`
    );
    return response.data.usersIsFollowing;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    console.error(error);
    throw new Error("Unknown Error");
  }
};

export const getUsersIsFollowerFn = async (userId: string) => {
  try {
    const response = await api.get<UsersIsFollowerResponse>(
      `/usersIsFollower/${userId}`
    );
    return response.data.usersIsFollower;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    console.error(error);
    throw new Error("Unknown Error");
  }
};

export const getSuggestedFollowers = async (userId: string) => {
  try {
    const response = await api.get<SuggestedFollowersResponse>(
      `/suggested/${userId}`
    );
    return response.data.suggestedFollowers;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    console.error(error);
    throw new Error("Unknown Error");
  }
};

export const userFollowFn = async (payload: FollowRequest) => {
  try {
    const response = await api.post<GenericResponse>(
      `/follow/${payload.targetUserId}`,
      {
        userId: payload.userId,
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    console.error(error);
    throw new Error("Unknown Error");
  }
};

export const userUnfollowFn = async (payload: UnfollowRequest) => {
  try {
    const response = await api.delete<GenericResponse>(
      `/unfollow/${payload.targetUserId}`
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    console.error(error);
    throw new Error("Unknown Error");
  }
};
