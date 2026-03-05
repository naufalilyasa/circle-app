import { likeReplyFn, unlikeReplyFn } from "@/api/like";
import { LikeRequest } from "@/types/like";
import { useMutation } from "@tanstack/react-query";
import useInvalidateQueries from "@/hooks/useInvalidateQueries";

function useLikeUnlikeReply(queryKeys?: string[][]) {
  const invalidateAll = useInvalidateQueries(queryKeys);

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
