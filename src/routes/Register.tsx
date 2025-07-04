/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { RegisterUserDTO, AuthUserValidation } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { RegisterUserRequest } from "@/types/auth";
import { signUpUserFn } from "@/api/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute({
  component: RegisterPage,
});

function RegisterPage() {
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
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<RegisterUserRequest> = (values) => {
    registerUser(values);
  };
  return (
    <section className="bg-[#1d1d1d] text-[#e8e8e8] min-h-svh w-screen">
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
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col justify-start items-start w-full gap-3">
                <h1 className="text-4xl font-bold text-[#04a41e]">Circle</h1>
                <h2 className="text-3xl font-bold">Create account Circle</h2>
              </div>
              <div className="flex flex-col w-100 gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Fullname"
                          {...field}
                          className="w-full border rounded-md p-2 border-gray-500 text-lg py-6 placeholder:text-neutral-400"
                        />
                      </FormControl>
                      {errors.name && (
                        <p className="text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          {...field}
                          className="w-full border rounded-md p-2 border-gray-500 text-lg py-6 placeholder:text-neutral-400"
                        />
                      </FormControl>

                      {errors.username && (
                        <p className="text-sm text-red-500">
                          {errors.username.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          type="email"
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
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="flex justify-center items-center space-x-2">
                      <Loader2Icon className="animate-spin size-5" />
                      <span className="pb-1">please wait</span>
                    </span>
                  ) : (
                    <span>Create</span>
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
