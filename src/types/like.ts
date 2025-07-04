export interface LikeResponse {
  id: string;
  userId: string;
  tweetId: string | null;
  replyId: string | null;
}

export interface LikeRequest {
  tweetId: string;
  userId: string;
}
