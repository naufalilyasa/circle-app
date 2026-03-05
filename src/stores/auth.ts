import { AuthUserStore } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthUserStore = create<AuthUserStore>()(
  persist(
    (set) => ({
      authUser: null,
      setAuthUser: (user) => {
        set({ authUser: user });
      },
      loading: false,
      setLoading: (loading: boolean) => set({ loading }),
    }),

    { name: "auth-user" }
  )
);
