import { likeTweetFn, unlikeTweetFn } from "@/api/like";
import { LikeRequest } from "@/types/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useLikeUnlikeTweet(queryKeys: string[][]) {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });
  };

  const { mutate: likeTweet, isPending: isLoadingLikeTweet } = useMutation({
    mutationKey: ["likeTweet"],
    mutationFn: likeTweetFn,
    onSuccess: invalidateAll,
  });

  const { mutate: unlikeTweet, isPending: isLoadingUnlikeTweet } = useMutation({
    mutationKey: ["unlikeTweet"],
    mutationFn: unlikeTweetFn,
    onSuccess: invalidateAll,
  });

  const onClickLikeTweetHandler = (payload: LikeRequest) => {
    likeTweet(payload);
  };

  const onClickUnlikeTweetHandler = (tweetId: string) => {
    unlikeTweet(tweetId);
  };
  return {
    isLoadingLikeTweet,
    isLoadingUnlikeTweet,
    onClickLikeTweetHandler,
    onClickUnlikeTweetHandler,
  };
}

export default useLikeUnlikeTweet;
