import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMeFn } from "@/api/auth";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "./_privateLayout/-components/Other/Loading";
import useLogin from "@/hooks/useLogin";

export const Route = createFileRoute({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const {
    errors,
    form,
    handleSubmit,
    isPending,
    isSubmitSuccessful,
    onSubmit,
    reset,
  } = useLogin();

  const {
    data: dataGetMe,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMeFn,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    reset();
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (dataGetMe) {
      navigate({ to: "/" });
    }
  }, [dataGetMe, navigate]);

  if (isLoading) return <Loading size={8} />;

  return (
    <section className="bg-[#1d1d1d] text-[#e8e8e8] min-h-svh w-screen">
      <div className="mx-auto lg:w-100 md:w-[50%] max-md:w-[80%] md:pt-30 max-md:pt-20">
        <Form {...form}>
          <form
            action=""
            className="flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-start items-start w-full gap-3">
              <h1 className="text-4xl font-bold text-[#04a41e]">Circle</h1>
              <h2 className="text-3xl font-bold">Login to Circle</h2>
              <p className="text-sm text-red-500">
                {error ? error.message : " "}
              </p>
            </div>
            <div className="flex flex-col lg:w-100 md:w-full max-md:w-full gap-3">
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
              <Link to={"/forgot"} className={"text-right text-sm"}>
                Forgot Password?
              </Link>
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
                  <span>Login</span>
                )}
              </Button>

              <div className="flex pt-1 max-md:text-sm">
                <p>Don't have an account yet? </p>
                <Link to={"/register"} className={"ps-1 text-[#04a41e]"}>
                  Create account
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
