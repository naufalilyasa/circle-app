import { AuthUserStore, MeResponse } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthUserStore = create<AuthUserStore>()(
  persist(
    (set) => ({
      authUser: {
        status: "",
        data: {
          user: {
            id: "",
            name: "",
            photoProfile: "",
            username: "",
            email: "",
            role: "",
            bio: "",
            provider: null,
          },
        },
      } as MeResponse,
      setAuthUser: (user) => {
        set({ authUser: user });
      },
      loading: false,
      setLoading: (loading: boolean) => set({ loading }),
    }),

    { name: "auth-user" }
  )
);
