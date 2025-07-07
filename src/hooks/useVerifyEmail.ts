/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyEmailFn } from "@/api/auth";
import { AuthUserValidation, VerificationCodeDTO } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function useVerifyEmail() {
  const form = useForm<VerificationCodeDTO>({
    resolver: zodResolver(AuthUserValidation.EMAIL_VERIFICATION),
  });

  const navigate = useNavigate();
  const verificationCode = useParams({
    from: "/verifyEmail/$verificationCode",
  });

  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: (verificationCode: string) => verifyEmailFn(verificationCode),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate({ to: "/login" });
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
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = form;

  const onSubmit: SubmitHandler<VerificationCodeDTO> = ({
    verificationCode,
  }) => {
    verifyEmail(verificationCode);
  };

  return {
    verificationCode,
    isPending,
    reset,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    onSubmit,
    form,
  };
}

export default useVerifyEmail;
