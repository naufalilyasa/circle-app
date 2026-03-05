/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginUserFn } from "@/api/auth";
import { AuthUserValidation, LoginUserDTO } from "@/schemas/auth";
import { LoginUserRequest } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      toast.success("You successfully logged in", {
        position: "top-right",
      });
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      if (Array.isArray(error.message)) {
        (error as any).message.forEach((element: any) => {
          toast.error(element, { position: "top-right" });
        });
      } else {
        toast.error(error.message, {
          position: "top-right",
        });
      }
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
