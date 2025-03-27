interface User {
  // id: number;
  username: string;
  password: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export type { User, UserStore };
