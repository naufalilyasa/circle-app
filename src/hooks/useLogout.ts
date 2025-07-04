/* eslint-disable @typescript-eslint/no-explicit-any */
import { logoutUserFn } from "@/api/auth";
import { useAuthUserStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";

function useLogout() {
  const { setAuthUser } = useAuthUserStore();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => logoutUserFn(),
    onSuccess: () => {
      toast.success("Successfully logged out", {
        position: "top-right",
      });
      setAuthUser(null);
      navigate({ to: "/login" });
    },
    onError: (error: any) => {
      if (Array.isArray((error as any).responses.data.error)) {
        (error as any).responses.data.error.forEach((element: any) => {
          toast.error(element.message, { position: "top-right" });
        });
      } else {
        toast.error((error as any).response.data.message, {
          position: "top-right",
        });
      }
    },
  });
  return { mutate, isPending };
}

export default useLogout;
