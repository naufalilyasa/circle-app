import { updateTweetFn } from "@/api/tweet";
import {
  TweetValidation,
  UpdateTweetDTO,
} from "@/schemas/tweet";
import { TweetUpdateRequest } from "@/types/tweet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import useInvalidateQueries from "@/hooks/useInvalidateQueries";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UseUpdateTweetType {
  tweetId: string;
  queryKeys?: string[][];
}

function useUpdateTweet({ tweetId, queryKeys }: UseUpdateTweetType) {
  const form = useForm<UpdateTweetDTO>({
    resolver: zodResolver(TweetValidation.UPDATE_TWEET),
  });
  const invalidateAll = useInvalidateQueries(queryKeys);

  const { reset, formState, handleSubmit, setValue } = form;
  const { mutate: updateTweet, isPending: isPendingUpdateTweet } = useMutation({
    mutationKey: ["updateTweet"],
    mutationFn: (payload: TweetUpdateRequest) => updateTweetFn(payload),
    onSuccess: () => {
      toast.success("You successfully updated tweet");
      invalidateAll();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmitUpdateTweet: SubmitHandler<UpdateTweetDTO> = (values) => {
    const payload: TweetUpdateRequest = {
      ...values,
      tweetId,
    };
    updateTweet(payload);
  };

  return {
    reset,
    formState,
    handleSubmit,
    form,
    isPendingUpdateTweet,
    onSubmitUpdateTweet,
    setValue,
  };
}

export default useUpdateTweet;
