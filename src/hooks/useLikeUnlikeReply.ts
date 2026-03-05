import { likeReplyFn, unlikeReplyFn } from "@/api/like";
import { LikeRequest } from "@/types/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useLikeUnlikeReply(queryKeys?: string[][]) {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    if (!queryKeys) return;
    queryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });
  };

  const { mutate: likeReply, isPending: isLoadingLikeReply } = useMutation({
    mutationKey: ["likeReply"],
    mutationFn: likeReplyFn,
    onSuccess: invalidateAll,
  });

  const { mutate: unlikeReply, isPending: isLoadingUnlikeReply } = useMutation({
    mutationKey: ["unlikeReply"],
    mutationFn: unlikeReplyFn,
    onSuccess: invalidateAll,
  });

  const onClickLikeReplyHandler = (payload: LikeRequest) => {
    likeReply(payload);
  };

  const onClickUnlikeReplyHandler = (tweetId: string) => {
    unlikeReply(tweetId);
  };

  return {
    isLoadingLikeReply,
    isLoadingUnlikeReply,
    onClickLikeReplyHandler,
    onClickUnlikeReplyHandler,
  };
}

export default useLikeUnlikeReply;
