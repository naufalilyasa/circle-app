/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMeFn, loginUserFn } from "@/api/auth";
import { AuthUserValidation, LoginUserDTO } from "@/schemas/auth";
import { LoginUserRequest } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthUserStore } from "@/stores/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function useLogin() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthUserStore();

  const form = useForm<LoginUserDTO>({
    resolver: zodResolver(AuthUserValidation.LOGIN),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = form;

  const { isPending, mutateAsync: loginUser } = useMutation({
    mutationFn: (userData: LoginUserRequest) => loginUserFn(userData),
    onSuccess: async () => {
      // Fetch and hydrate store BEFORE navigating so CardProfile doesn't crash
      const me = await getMeFn();
      if (me) setAuthUser(me);
      toast.success("You successfully logged in");
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginUserDTO> = (values) => {
    loginUser(values);
  };

  return {
    onSubmit,
    isPending,
    loginUser,
    form,
    errors,
    handleSubmit,
    isSubmitSuccessful,
    reset,
  };
}

export default useLogin;
