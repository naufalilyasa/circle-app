import { resetPasswordFn } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthUserValidation, ResetPasswordDTO } from "@/schemas/auth";
import { ResetPasswordRequest } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const Route = createFileRoute({
  component: ResetPage,
});

function ResetPage() {
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<ResetPasswordRequest> = (values) => {
    resetPassword(values);
  };

  return (
    <section className="bg-[#1d1d1d] text-[#e8e8e8] min-h-svh w-screen bg-">
      <div className="mx-auto w-100 pt-30">
        <Form {...form}>
          <form
            className="flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-start items-start w-full gap-3">
              <h1 className="text-4xl font-bold text-[#04a41e]">Circle</h1>
              <h2 className="text-3xl font-bold">Reset password</h2>
            </div>
            <div className="flex flex-col w-100 gap-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                        className="w-full border rounded-md p-2 border-gray-500 text-lg py-6 placeholder:text-neutral-400"
                      />
                    </FormControl>
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                        className="w-full border rounded-md p-2 border-gray-500 text-lg py-6 placeholder:text-neutral-400"
                      />
                    </FormControl>
                    {errors.passwordConfirm && (
                      <p className="text-sm text-red-500">
                        {errors.passwordConfirm.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#04a41e] hover:bg-[#04a41e]/75 rounded-3xl py-5 text-xl font-bold text-center"
              >
                {isPending ? (
                  <span className="flex justify-center items-center space-x-2">
                    <Loader2Icon className="animate-spin size-5" />
                    <span className="pb-1">please wait</span>
                  </span>
                ) : (
                  <span>Create New Password</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
