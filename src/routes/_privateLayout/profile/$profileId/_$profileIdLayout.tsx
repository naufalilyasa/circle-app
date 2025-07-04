import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TbArrowLeft } from "react-icons/tb";
import { Link, Outlet, useParams, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserByIdFn } from "@/api/user";
import { UserResponse } from "@/types/user";
import { useLocation } from "@tanstack/react-router";
import { FollowRequest, UnfollowRequest } from "@/types/follow";
import { userFollowFn, userUnfollowFn } from "@/api/follow";
import { Button } from "@/components/ui/button";
import { useAuthUserStore } from "@/stores/auth";
import Loading from "../../-components/Other/Loading";

export const Route = createFileRoute({
  component: ProfilePage,
});
function ProfilePage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const { authUser } = useAuthUserStore();
  const userId = authUser?.data.user.id;

  const params = useParams({
    from: "/_privateLayout/profile/$profileId/_$profileIdLayout",
  });
  const profileId = params.profileId;

  const defaultDataUserById: UserResponse = {
    id: "",
    name: "",
    photoProfile: "",
    username: "",
    email: "",
    role: "",
    bio: "",
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      followers: 0,
      followings: 0,
    },
    isFollowedByCurrentUser: false,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getDetailUserId", profileId],
    queryFn: () => getUserByIdFn(profileId),
    initialData: defaultDataUserById,
  });

  const { mutate: follow, isPending: isLoadingFollow } = useMutation({
    mutationKey: ["followUser"],
    mutationFn: (payload: FollowRequest) => userFollowFn(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getDetailUserId"],
      });
      queryClient.invalidateQueries({
        queryKey: ["usersIsFollowing"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getSuggestedFollowers"],
      });
    },
  });

  const { mutate: unfollow, isPending: isLoadingUnfollow } = useMutation({
    mutationKey: ["unfollowUser"],
    mutationFn: (payload: UnfollowRequest) => userUnfollowFn(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getDetailUserId"],
      });
      queryClient.invalidateQueries({
        queryKey: ["usersIsFollowing"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getSuggestedFollowers"],
      });
    },
  });

  const onClickFollowHandler = (values: FollowRequest) => {
    follow(values);
  };

  const onClickUnfollowHandler = (values: UnfollowRequest) => {
    unfollow(values);
  };

  const isActive = (route: string) => {
    return pathname === route;
  };

  return isLoading ? (
    <Loading size={8} />
  ) : (
    <section>
      {/* Title Page */}
      <div className="md:pt-10 max-md:pt-5 px-5 pb-2 flex items-center text-3xl gap-[10px] opacity-80">
        <button
          onClick={() => router.history.back()}
          className="cursor-pointer"
        >
          <TbArrowLeft className="w-7 h-7 stroke-1" />
        </button>
        <h1 className="font-bold text-3xl">{data?.name}</h1>
      </div>
      <div className="grid grid-cols-1 border-collapse gap-3">
        {/* Profile Info */}
        <div className="top-30 flex flex-col px-5 gap-5">
          <img
            src={data.banner ? data.banner : "default-banner.jpg"}
            alt=""
            className="rounded-lg h-35 w-full"
          />
          <div className="flex justify-between items-end w-full">
            <div>
              <Avatar className="size-20 ms-4 -mt-24 border-4 border-[#262626]">
                <AvatarImage
                  src={
                    data?.photoProfile
                      ? data.photoProfile
                      : "default-profile-picture.png"
                  }
                />
              </Avatar>
            </div>
            <div className="">
              {/* <button className="px-4 py-2 flex-1 w-full text-sm font-bold rounded-full border-1 border-[#FFFFFF]"> */}
              {data.isFollowedByCurrentUser ? (
                <Button
                  onClick={() =>
                    onClickUnfollowHandler({
                      targetUserId: data.id,
                    })
                  }
                  className={`rounded-3xl px-4 py-2 bg-transparent border-1 ${data.isFollowedByCurrentUser ? "border-[#e8e8e8]/50 text-[#e8e8e8]/50" : "border-[#e8e8e8] text-[#e8e8e8]"}  cursor-pointer`}
                  disabled={isLoadingUnfollow}
                >
                  Following
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    onClickFollowHandler({
                      targetUserId: data.id,
                      userId: userId!,
                    })
                  }
                  className={`rounded-3xl px-4 py-2 bg-transparent border-1 ${data.isFollowedByCurrentUser ? "border-[#e8e8e8]/50 text-[#e8e8e8]/50" : "border-[#e8e8e8] text-[#e8e8e8]"}  cursor-pointer`}
                  disabled={isLoadingFollow}
                >
                  Follow
                </Button>
              )}

              {/* </button> */}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">{data?.name}</h1>
              <p className="text-[#909090] text-sm">{"@" + data?.username}</p>
              <p>{data?.bio}</p>
              <div className="flex gap-2 text-base">
                <p>{data?._count.followers ? data?._count.followers : "0"}</p>
                <span className="text-[#909090]">following</span>
                <p>{data?._count.followings ? data?._count.followings : "0"}</p>
                <span className="text-[#909090]">followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between text-center font-medium gap-[10px] border-b-1 border-[#2c2c2c]">
          <Link
            to="/profile/$profileId"
            params={{ profileId: data.id }}
            className={
              isActive(`/profile/${data.id}`)
                ? "w-full py-2 mx-5 border-4 border-[#1d1d1d] hover:border-b-[#04a41e] border-b-[#04a41e]"
                : "w-full py-2 mx-5 border-4 border-[#1d1d1d] hover:border-b-[#04a41e] active:border-b-[#04a41e]"
            }
          >
            All Post
          </Link>
          <Link
            to="/profile/$profileId/media"
            params={{ profileId: data.id }}
            className={
              isActive(`/profile/${data.id}/media`)
                ? "w-full py-2 mx-5 border-4 border-[#1d1d1d] hover:border-b-[#04a41e] border-b-[#04a41e]"
                : "w-full py-2 mx-5 border-4 border-[#1d1d1d] hover:border-b-[#04a41e] active:border-b-[#04a41e]"
            }
          >
            Media
          </Link>
        </div>
        <div className="flex flex-col">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
