import { UserResponse } from "./user";

export interface UserFollowersResponse {
  result: [
    {
      id: string;
      followerId: string;
      followingId: string;
      createdAt: Date;
      follower: UserResponse;
    },
  ];
}

export interface UserFollowingsResponse {
  result: [
    {
      id: string;
      followerId: string;
      followingId: string;
      createdAt: Date;
      following: UserResponse;
    },
  ];
}

export interface FollowRequest {
  targetUserId: string;
  userId: string;
}

export interface UnfollowRequest {
  targetUserId: string;
}

export interface FollowResponse {
  status: string;
  message: string;
}

export interface UnfollowResponse {
  status: string;
  message: string;
}

export interface UsersIsFollowingResponse {
  usersIsFollowing: UsersIsfollowingType[];
}

export interface UsersIsfollowingType {
  id: string;
  name: string;
  username: string;
  photoProfile: string;
  bio: string;
  isFollowing: boolean;
}

export interface UsersIsFollowerResponse {
  usersIsFollower: UsersIsfollowerType[];
}

export interface UsersIsfollowerType {
  id: string;
  name: string;
  username: string;
  photoProfile: string;
  bio: string;
  isFollower: boolean;
}

export interface SuggestedFollowersResponse {
  suggestedFollowers: SuggestedFollowersType[];
}

export interface SuggestedFollowersType {
  id: string;
  name: string;
  username: string;
  photoProfile: string;
  bio: string;
  _count: {
    followers: number;
  };
  isFollow: boolean;
}
