import { Link } from "@tanstack/react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useRegister from "@/hooks/useRegister";
import { Loader2Icon } from "lucide-react";

export const Route = createFileRoute({
  component: RegisterPage,
});

function RegisterPage() {
  const { data, form, isPending, isSuccess, onSubmit } = useRegister();
  return (
    <section className="bg-[#1d1d1d] text-[#e8e8e8] min-h-svh w-screen">
      <div
        className={
          data && isSuccess
            ? "bg-[#1d1d1d] mx-auto w-[35rem] md:w-[50%] md:pt-30 max-md:w-[80%] max-md:pt-20"
            : "bg-[#1d1d1d] mx-auto lg:w-100 md:w-[50%] md:pt-30 max-md:w-[80%] max-md:pt-20"
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
              <div className="flex flex-col justify-start items-start w-full gap-3 lg:w-100 md:w-full max-md:w-full">
                <h1 className="text-4xl font-bold text-[#04a41e]">Circle</h1>
                <h2 className="text-3xl font-bold">Create account Circle</h2>
              </div>
              <div className="flex flex-col lg:w-100 md:w-full max-md:w-full gap-3">
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
                      <FormMessage />
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

                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                <div className="flex pt-1 w-full">
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
