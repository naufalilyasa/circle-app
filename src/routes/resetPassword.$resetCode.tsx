import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useResetPassword from "@/hooks/useResetPassword";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute({
  component: ResetPage,
});

function ResetPage() {
  const {
    form,
    errors,
    handleSubmit,
    isPending,
    onSubmit,
    isSubmitSuccessful,
    reset,
  } = useResetPassword();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className="bg-[#1d1d1d] text-[#e8e8e8] min-h-svh w-screen bg-">
      <div className="mx-auto lg:w-100 md:w-[50%] md:pt-30 max-md:w-[80%] max-md:pt-20">
        <Form {...form}>
          <form
            className="flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-start items-start w-full gap-3">
              <h1 className="text-4xl font-bold text-[#04a41e]">Circle</h1>
              <h2 className="text-3xl font-bold">Reset password</h2>
            </div>
            <div className="flex flex-col lg:w-100 md:w-full max-md:w-full gap-3">
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
