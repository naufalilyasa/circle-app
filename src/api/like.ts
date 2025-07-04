import api from "@/lib/axios";
import { LikeRequest } from "@/types/like";
import { isAxiosError } from "axios";

type GenericResponse = {
  status: string;
  message: string;
};

export const likeTweetFn = async (payload: LikeRequest) => {
  try {
    const response = await api.post<GenericResponse>(
      `/likeTweet/${payload.tweetId}`,
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

export const unlikeTweetFn = async (tweetId: string) => {
  try {
    const response = await api.delete<GenericResponse>(
      `/unlikeTweet/${tweetId}`
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

export const likeReplyFn = async (payload: LikeRequest) => {
  try {
    const response = await api.post<GenericResponse>(
      `/likeReply/${payload.tweetId}`,
      { userId: payload.userId }
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

export const unlikeReplyFn = async (tweetId: string) => {
  try {
    const response = await api.delete<GenericResponse>(
      `/unlikeReply/${tweetId}`
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
