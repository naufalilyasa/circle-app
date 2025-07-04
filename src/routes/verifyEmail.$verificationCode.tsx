/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyEmailFn } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthUserValidation, VerificationCodeDTO } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const Route = createFileRoute({
  component: EmailVerification,
});

function EmailVerification() {
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (verificationCode) {
      reset(verificationCode);
    }
  }, []);

  const onSubmit: SubmitHandler<VerificationCodeDTO> = ({
    verificationCode,
  }) => {
    verifyEmail(verificationCode);
  };

  return (
    <section className="bg-[#1d1d1d] text-[#e8e8e8] min-h-svh w-screen">
      <div className="mx-auto w-100 pt-30">
        <Form {...form}>
          <form
            action=""
            className="flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-start items-start w-full gap-3">
              <h1 className="text-4xl font-bold text-[#04a41e]">Circle</h1>
              <h2 className="text-3xl font-bold">Verify Email Address</h2>
            </div>
            <div className="flex flex-col w-100 gap-3">
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Verification code"
                        {...field}
                        className="w-full border rounded-md p-2 border-gray-500 text-lg py-6 placeholder:text-neutral-400"
                      />
                    </FormControl>
                    {errors.verificationCode && (
                      <p className="text-sm text-red-500">
                        {errors.verificationCode.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#04a41e] hover:bg-[#04a41e]/75 rounded-3xl py-5 text-xl font-bold text-center"
                disabled={isPending}
              >
                {isPending ? (
                  <span>
                    <Loader2Icon className="animate-spin" />
                    please wait
                  </span>
                ) : (
                  <span>Verify Email</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
