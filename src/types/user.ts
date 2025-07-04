export interface User {
  status: string;
  data: {
    user: {
      id: number;
      name: string;
      photoProfile: string;
      username: string;
      email: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
      provider?: string | null;
    };
  };
}

export interface UserResponse {
  id: string;
  name: string;
  photoProfile: string;
  banner?: string;
  username: string;
  email: string;
  role: string;
  bio: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    followers: number;
    followings: number;
  };
  isFollowedByCurrentUser: boolean;
}

export interface UserUpdateRequest {
  id: string;
  name: string;
  username?: string;
  bio: string;
  photoProfile?: File;
  banner?: File;
}

export interface UsersResponse {
  data: UserResponse[];
}

// interface LoginUserStore {
//   user: LoginUserResponse;
//   setUser: (user: LoginUserResponse) => void;
//   clearUser: () => void;
//   isAuthenticated: boolean;
// }
