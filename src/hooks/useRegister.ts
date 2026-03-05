/* eslint-disable @typescript-eslint/no-explicit-any */
import { signUpUserFn } from "@/api/auth";
import { AuthUserValidation, RegisterUserDTO } from "@/schemas/auth";
import { RegisterUserRequest } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function useRegister() {
  const form = useForm<RegisterUserDTO>({
    resolver: zodResolver(AuthUserValidation.REGISTER),
  });

  const {
    mutate: registerUser,
    data,
    isSuccess,
    isPending,
  } = useMutation({
    mutationKey: ["registerAuth"],
    mutationFn: (userData: RegisterUserRequest) => signUpUserFn(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      if (Array.isArray((error as any).response.data.error)) {
        (error as any).response.data.error.forEach((element: any) => {
          toast.error(element.message, {
            position: "top-right",
          });
        });
      } else {
        toast.error((error as any).response.data.message, {
          position: "top-right",
        });
      }
    },
  });

  const {
    reset,
    formState: { isSubmitSuccessful, errors },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<RegisterUserRequest> = (values) => {
    registerUser(values);
  };

  return {
    onSubmit,
    errors,
    isPending,
    registerUser,
    form,
    data,
    isSuccess,
    reset,
  };
}

export default useRegister;
