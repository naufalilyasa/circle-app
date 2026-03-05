import api from "@/lib/axios";
import { ReplyRequest, ReplyResponse } from "@/types/reply";
import { isAxiosError } from "axios";

export const createReplyByIdFn = async (newReplyData: ReplyRequest) => {
  try {
    const response = await api.post<ReplyResponse>("/replies", newReplyData, {
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
