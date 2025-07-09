import {
  getUsersIsFollowingFn,
  userFollowFn,
  userUnfollowFn,
} from "@/api/follow";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthUserStore } from "@/stores/auth";
import {
  FollowRequest,
  UnfollowRequest,
  UsersIsfollowingType,
} from "@/types/follow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import Loading from "../../-components/Other/Loading";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { authUser } = useAuthUserStore();
  const userId = authUser?.data.user.id;

  const defaultDataUsersIsFollow: UsersIsfollowingType[] = [
    {
      id: "",
      name: "",
      photoProfile: "default-photo-profile.png",
      username: "",
      bio: "",
      isFollowing: false,
    },
  ];

  const { data: dataUserIsFollow, isFetching } = useQuery({
    queryKey: ["usersIsFollowing", userId],
    queryFn: () => getUsersIsFollowingFn(userId!),
    enabled: !!userId,
    placeholderData: defaultDataUsersIsFollow,
  });

  const { mutate: follow, isPending: isLoadingFollow } = useMutation({
    mutationKey: ["followUser"],
    mutationFn: (payload: FollowRequest) => userFollowFn(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersIsFollowing"] });
    },
  });

  const { mutate: unfollow, isPending: isLoadingUnfollow } = useMutation({
    mutationKey: ["unfollowUser"],
    mutationFn: (payload: UnfollowRequest) => userUnfollowFn(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersIsFollowing"] });
    },
  });

  const onClickFollowHandler = (values: FollowRequest) => {
    follow(values);
  };

  const onClickUnfollowHandler = (values: UnfollowRequest) => {
    unfollow(values);
  };

  return (
    <div className="">
      {!dataUserIsFollow?.length ? (
        <div className="max-md:w-65 p-5">
          <p>No following.</p>
        </div>
      ) : isFetching ? (
        <Loading size={8} />
      ) : (
        dataUserIsFollow.map((following) => (
          <Link
            to="/profile/$profileId"
            params={{ profileId: following.id }}
            className="flex flex-col w-full justify-between items-center hover:bg-[#262626] py-3 px-6 gap-1 cursor-pointer"
            key={following.id}
          >
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={
                      following.photoProfile
                        ? following.photoProfile
                        : "/default-profile-picture.png"
                    }
                  />
                </Avatar>
                <div className="flex flex-col gap-1 break-all">
                  <p className="font-bold">{following.name}</p>
                  <p className="text-[#e8e8e8]/50 font-medium">
                    {`@${following.username}`}
                  </p>
                </div>
              </div>
              <div>
                {following.isFollowing ? (
                  <Button
                    onClick={() =>
                      onClickUnfollowHandler({
                        targetUserId: following.id,
                      })
                    }
                    className={`rounded-3xl px-4 py-2 bg-transparent border-1 ${following.isFollowing ? "border-[#e8e8e8]/50 text-[#e8e8e8]/50" : "border-[#e8e8e8] text-[#e8e8e8]"}  cursor-pointer`}
                    disabled={isLoadingUnfollow}
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      onClickFollowHandler({
                        targetUserId: following.id,
                        userId: userId!,
                      })
                    }
                    className={`rounded-3xl px-4 py-2 bg-transparent border-1 ${following.isFollowing ? "border-[#e8e8e8]/50 text-[#e8e8e8]/50" : "border-[#e8e8e8] text-[#e8e8e8]"}  cursor-pointer`}
                    disabled={isLoadingFollow}
                  >
                    Follow
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full ps-14">
              <p className="lg:w-138 md:w-117 max-md:w-65 truncate">
                {following.bio}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
