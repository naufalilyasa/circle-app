import { forgotPasswordFn } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthUserValidation, ForgotPasswordDTO } from "@/schemas/auth";
import { ForgotPasswordRequest } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const Route = createFileRoute({
  component: ForgotPage,
});

function ForgotPage() {
  const form = useForm<ForgotPasswordDTO>({
    resolver: zodResolver(AuthUserValidation.FORGOT_PASSWORD),
  });
  const {
    data,
    isSuccess,
    isPending,
    mutate: forgotPassword,
  } = useMutation({
    mutationFn: (email: string) => forgotPasswordFn(email),
    onSuccess: () => {
      toast.success(data?.message);
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

  const onSubmit: SubmitHandler<ForgotPasswordRequest> = ({ email }) => {
    forgotPassword(email);
  };
  return (
    <section className="bg-[#1d1d1d] text-[#e8e8e8] min-h-svh w-screen bg-">
      <div
        className={
          data && isSuccess
            ? "bg-[#1d1d1d] mx-auto w-[35rem] pt-30"
            : "bg-[#1d1d1d] mx-auto w-100 pt-30"
        }
      >
        {data && isSuccess ? (
          <div className="flex flex-col items-center text-center">
            <h3 className="text-4xl font-semibold mb-8">Almost there!</h3>
            <p className="text-xl">{data.message}</p>
            <p className="mt-8">
              Already confirmed? then you can{" "}
              <Link
                to="/login"
                className="font-bold text-[#04a41e] hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              className="flex flex-col justify-center items-center gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col justify-start items-start w-full gap-3">
                <h1 className="text-4xl font-bold text-[#04a41e]">Circle</h1>
                <h2 className="text-3xl font-bold">Forgot to Password</h2>
              </div>
              <div className="flex flex-col w-100 gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          className="w-full border rounded-md p-2 border-gray-500 text-lg py-6 placeholder:text-neutral-400"
                        />
                      </FormControl>
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
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
                    <span>Send Instruction</span>
                  )}
                </Button>
                <div className="flex pt-1">
                  <p>Already have account? </p>
                  <Link to={"/login"} className={"ps-1 text-[#04a41e]"}>
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        )}
      </div>
    </section>
  );
}
