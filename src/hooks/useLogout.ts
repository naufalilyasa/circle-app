/* eslint-disable @typescript-eslint/no-explicit-any */
import { logoutUserFn } from "@/api/auth";
import { useAuthUserStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "react-toastify";

function useLogout() {
  const { setAuthUser } = useAuthUserStore();
  const navigate = useRouter();

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: () => logoutUserFn(),
    onSuccess: () => {
      toast.success("Successfully logged out", {
        position: "top-right",
      });
      setAuthUser(null);
      return navigate.navigate({
        to: "/login",
        replace: true,
      });
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

  const onSubmitLogout = () => {
    logoutUser();
  };

  return { onSubmitLogout, isPending };
}

export default useLogout;
