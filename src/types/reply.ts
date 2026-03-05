import { UserResponse } from "./user";

export interface ReplyRequest {
  content: string;
  authorId: string;
  tweetId: string;
}

export interface ReplyResponse {
  id: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  tweetId: string;
  authorId: string;
  author: UserResponse;
  _count: {
    likes: number;
  };
  isLike: boolean;
}

export interface IReply {
  content: string;
  image: File | undefined;
}
