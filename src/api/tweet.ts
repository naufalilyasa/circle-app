import api from "@/lib/axios";
import { GenericResponse } from "@/types/auth";
import {
  AllTweetByUserIdResponse,
  AllTweetResponse,
  TweetDetailResponse,
  TweetRequest,
  TweetUpdateRequest,
} from "@/types/tweet";
import { isAxiosError } from "axios";

export const allTweetsFn = async ({ pageParam }: { pageParam: number }) => {
  try {
    const queryParams = `?page=${pageParam}&limit=10`;

    const response = await api.get<AllTweetResponse>(`/tweets${queryParams}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export const allTweetsByUserIdFn = async ({
  userId,
  pageParam,
}: {
  userId: string;
  pageParam: number;
}) => {
  try {
    const queryParams = `?page=${pageParam}&limit=10`;

    const response = await api.get<AllTweetByUserIdResponse>(
      `/tweets/all/${userId}${queryParams}`
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

export const allTweetsWithMediaByUserIdFn = async ({
  userId,
  pageParam,
}: {
  userId: string;
  pageParam: number;
}) => {
  try {
    const queryParams = `?page=${pageParam}&limit=10&hasMedia=true`;

    const response = await api.get<AllTweetByUserIdResponse>(
      `/tweets/all/${userId}${queryParams}`
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

export const createTweetFn = async (tweetData: TweetRequest) => {
  try {
    const response = await api.post<GenericResponse>(`/tweets`, tweetData, {
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

export const tweetByIdFn = async (tweetId: string) => {
  try {
    const response = await api.get<TweetDetailResponse>(`/tweets/${tweetId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export const updateTweetFn = async (payload: TweetUpdateRequest) => {
  try {
    const response = await api.patch<GenericResponse>(
      `/tweets/${payload.tweetId}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export const deleteTweetFn = async (tweetId: string) => {
  try {
    const response = await api.delete<GenericResponse>(`/tweets/${tweetId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
  }
};
