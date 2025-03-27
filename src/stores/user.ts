import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";
import { UserStore } from "@/types/user";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {} as User,
      setUser: (user) => set(() => ({ user: user })),
      clearUser: () => set(() => ({ user: {} as User })),
    }),
    { name: "auth-store" }
  )
);
