import { createTweetFn } from "@/api/tweet";
import { CreateTweetDTO, TweetValidation } from "@/schemas/tweet";
import { useAuthUserStore } from "@/stores/auth";
import { TweetRequest } from "@/types/tweet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function useCreateTweet(queryKeys?: string[][]) {
  const { authUser } = useAuthUserStore();
  const userId = authUser?.data.user.id;
  const form = useForm<CreateTweetDTO>({
    resolver: zodResolver(TweetValidation.CREATE_TWEET),
  });

  const queryClient = useQueryClient();
  const invalidateAll = () => {
    if (!queryKeys) return;
    queryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });
  };

  const { reset, formState, handleSubmit } = form;

  const {
    mutate: createTweet,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["createTweet"],
    mutationFn: (tweetData: TweetRequest) => createTweetFn(tweetData),
    onSuccess: () => {
      toast.success("You successfully created tweet", {
        position: "top-right",
      });
      invalidateAll();
    },
    onError: (error: Error) => {
      if (Array.isArray(error.message)) {
        error.message.forEach((element) => {
          toast.error(element, { position: "top-right" });
        });
      } else {
        toast.error(error.message, {
          position: "top-right",
        });
      }
    },
  });

  const onSubmitCreateTweet: SubmitHandler<CreateTweetDTO> = (values) => {
    const payload: TweetRequest = {
      ...values,
      authorId: userId!,
    };
    createTweet(payload);
  };

  return {
    reset,
    formState,
    handleSubmit,
    onSubmitCreateTweet,
    isPending,
    form,
    isError,
  };
}

export default useCreateTweet;
