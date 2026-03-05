import { SuggestedFollowersType, UsersIsfollowerType } from "@/types/follow";
import {
  AllTweetResponse,
  TweetDetailResponse,
  TweetResponse,
} from "@/types/tweet";
import { UserResponse } from "@/types/user";

export const defaultDataAllTweetsPaginated: AllTweetResponse = {
  status: "",
  data: {
    tweetsIsLike: [
      {
        id: "",
        content: "",
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: "",
        author: {
          id: "",
          name: "",
          photoProfile: "",
          username: "",
          email: "",
          role: "",
          bio: "",
          verified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          _count: {
            followers: 0,
            followings: 0,
          },
          isFollowedByCurrentUser: false,
        },
        _count: {
          likes: 0,
          replies: 0,
        },
        isLike: false,
      },
    ],
    total: 0,
    hasNext: false,
  },
};

export const defaultDataDetailTweet: TweetDetailResponse = {
  id: "",
  content: "",
  imageUrl: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: "",
  author: {
    id: "",
    name: "",
    photoProfile: "",
    username: "",
    email: "",
    role: "",
    bio: "",
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      followers: 0,
      followings: 0,
    },
    isFollowedByCurrentUser: false,
  },
  replies: [
    {
      id: "",
      content: "",
      imageUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      tweetId: "",
      authorId: "",
      author: {
        id: "",
        name: "",
        photoProfile: "",
        username: "",
        email: "",
        role: "",
        bio: "",
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: {
          followers: 0,
          followings: 0,
        },
        isFollowedByCurrentUser: false,
      },
      _count: {
        likes: 0,
      },
      isLike: false,
    },
  ],
  _count: {
    likes: 0,
    replies: 0,
  },
  isLike: false,
};

export const defaultTweets: TweetResponse[] = [
  {
    id: "",
    content: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: "",
    author: {
      id: "",
      name: "",
      username: "",
      email: "",
      photoProfile: "",
      bio: "",
      role: "USER",
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      _count: {
        followers: 0,
        followings: 0,
      },
      isFollowedByCurrentUser: false,
    },
    _count: {
      likes: 0,
      replies: 0,
    },
    isLike: false,
  },
];

export const defaultDataUsersIsFollower: UsersIsfollowerType[] = [
  {
    id: "",
    name: "",
    photoProfile: "default-photo-profile.png",
    username: "",
    bio: "",
    isFollower: false,
  },
];

export const defaultDataSuggestedFollowers: SuggestedFollowersType[] = [
  {
    id: "",
    name: "",
    username: "",
    photoProfile: "",
    bio: "",
    _count: {
      followers: 0,
    },
    isFollow: false,
  },
];

export const defaultDataUserById: UserResponse = {
  id: "",
  name: "",
  username: "",
  photoProfile: "",
  bio: "",
  email: "",
  role: "",
  verified: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  _count: {
    followers: 0,
    followings: 0,
  },
  isFollowedByCurrentUser: false,
};

export const defaultUser: UserResponse = {
  id: "",
  name: "",
  photoProfile: "default-photo-profile.png",
  username: "",
  email: "",
  role: "USER",
  bio: "",
  verified: false,
  createdAt: new Date(0),
  updatedAt: new Date(0),
  _count: {
    followers: 0,
    followings: 0,
  },
  isFollowedByCurrentUser: false,
};
