import { ReplyResponse } from "./reply";
import { UserResponse } from "./user";

export interface TweetRequest {
  content?: string;
  authorId: string;
  image?: File | undefined;
}

export interface TweetUpdateRequest {
  tweetId: string;
  content?: string;
  image?: File | undefined;
}

export interface TweetResponse {
  id: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: UserResponse;
  _count: {
    likes: number;
    replies: number;
  };
  isLike: boolean;
}

export interface TweetDetailResponse {
  id: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: UserResponse;
  replies: ReplyResponse[];
  _count: {
    likes: number;
    replies: number;
  };
  isLike: boolean;
}

export interface AllTweetByUserIdResponse {
  data: { tweetsByIdIsLike: TweetResponse[]; total: number; hasNext: boolean };
}

export interface AllTweetResponse {
  status: string;
  data: { tweetsIsLike: TweetResponse[]; total: number; hasNext: boolean };
}

export interface TweetUserStore {
  tweets: AllTweetResponse | undefined;
  setTweets: (tweetsData: AllTweetResponse | undefined) => void;
}
