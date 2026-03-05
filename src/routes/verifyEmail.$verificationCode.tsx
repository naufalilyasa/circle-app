import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute({
  component: EmailVerification,
});

function EmailVerification() {
  const {
    errors,
    handleSubmit,
    isPending,
    isSubmitSuccessful,
    onSubmit,
    reset,
    verificationCode,
    form,
  } = useVerifyEmail();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (verificationCode) {
      reset(verificationCode);
    }
  }, [verificationCode, reset]);

  return (
    <section className="bg-[#1d1d1d] text-[#e8e8e8] min-h-svh w-screen">
      <div className="mx-auto lg:w-100 md:w-[50%] md:pt-30 max-md:w-[80%] max-md:pt-20">
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
            <div className="flex flex-col lg:w-100 md:w-full max-md:w-full gap-3">
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
