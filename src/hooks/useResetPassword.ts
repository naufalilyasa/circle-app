import { resetPasswordFn } from "@/api/auth";
import { AuthUserValidation, ResetPasswordDTO } from "@/schemas/auth";
import { ResetPasswordRequest } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function useResetPassword() {
  const navigate = useNavigate();
  const { resetCode } = useParams({ from: "/resetPassword/$resetCode" });

  const form = useForm<ResetPasswordDTO>({
    resolver: zodResolver(AuthUserValidation.RESET_PASSWORD),
  });
  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = form;

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (data: ResetPasswordRequest) =>
      resetPasswordFn(data, resetCode),
    onSuccess: (data) => {
      toast.success(data?.message);
      navigate({ to: "/login" });
    },
    onError: (error) => {
      if (Array.isArray(error.message)) {
        error.message.forEach((el) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error(error.message, {
          position: "top-right",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordRequest> = (values) => {
    resetPassword(values);
  };

  return {
    form,
    errors,
    isPending,
    handleSubmit,
    onSubmit,
    resetCode,
    isSubmitSuccessful,
    reset,
  };
}

export default useResetPassword;
