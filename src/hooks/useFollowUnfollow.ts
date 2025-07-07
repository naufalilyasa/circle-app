import { userFollowFn, userUnfollowFn } from "@/api/follow";
import { FollowRequest, UnfollowRequest } from "@/types/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useFollowUnfollow(queryKeys?: string[][]) {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    if (!queryKeys) return;
    queryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });
  };

  const { mutate: follow, isPending: isLoadingFollow } = useMutation({
    mutationKey: ["followUser"],
    mutationFn: (payload: FollowRequest) => userFollowFn(payload),
    onSuccess: invalidateAll,
  });

  const { mutate: unfollow, isPending: isLoadingUnfollow } = useMutation({
    mutationKey: ["unfollowUser"],
    mutationFn: (payload: UnfollowRequest) => userUnfollowFn(payload),
    onSuccess: invalidateAll,
  });

  const onClickFollowHandler = (values: FollowRequest) => {
    follow(values);
  };

  const onClickUnfollowHandler = (values: UnfollowRequest) => {
    unfollow(values);
  };

  return {
    isLoadingFollow,
    isLoadingUnfollow,
    onClickFollowHandler,
    onClickUnfollowHandler,
  };
}

export default useFollowUnfollow;
