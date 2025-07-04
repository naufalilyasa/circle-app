/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthUserValidation, LoginUserDTO } from "@/schemas/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMeFn, loginUserFn } from "@/api/auth";
import { toast } from "react-toastify";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginUserRequest } from "@/types/auth";
import { useCookies } from "react-cookie";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute({
  component: LoginPage,
});

function LoginPage() {
  const [cookies] = useCookies(["logged_in"]);

  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<LoginUserDTO>({
    resolver: zodResolver(AuthUserValidation.LOGIN),
  });

  const {
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = form;

  const { isPending, mutate: loginUser } = useMutation({
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

  const queryGetMe = useQuery({
    queryKey: ["getMe"],
    queryFn: getMeFn,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const queryClient = useQueryClient();

  if (!cookies.logged_in) {
    queryClient.invalidateQueries({ queryKey: ["getMe"] });
  }

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<LoginUserDTO> = (values) => {
    loginUser(values);
  };

  useEffect(() => {
    if (cookies.logged_in) {
      (() => router.history.back())();
    }
  }, [cookies.logged_in, router.history]);

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
              <h2 className="text-3xl font-bold">Login to Circle</h2>
              <p className="text-sm text-red-500">
                {queryGetMe.error ? queryGetMe.error.message : " "}
              </p>
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

              <div className="flex pt-1">
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
