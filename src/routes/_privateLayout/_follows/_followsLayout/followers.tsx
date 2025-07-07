import { getUsersIsFollowerFn } from "@/api/follow";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { defaultDataUsersIsFollower } from "@/defaultData";
import useFollowUnfollow from "@/hooks/useFollowUnfollow";
import { useAuthUserStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import Loading from "../../-components/Other/Loading";

export const Route = createFileRoute({
  component: Followers,
});

function Followers() {
  const { authUser } = useAuthUserStore();
  const userId = authUser?.data.user.id;

  const { data: dataUserIsFollow, isLoading } = useQuery({
    queryKey: ["usersIsFollower", userId],
    queryFn: () => getUsersIsFollowerFn(userId!),
    enabled: !!userId,
    initialData: defaultDataUsersIsFollower,
  });

  const {
    isLoadingFollow,
    isLoadingUnfollow,
    onClickFollowHandler,
    onClickUnfollowHandler,
  } = useFollowUnfollow([
    ["usersIsFollower", "getSuggestedFollowers", "getUserById"],
  ]);

  if (isLoading) return <Loading size={8} />;

  return (
    <div className="w-full">
      {!dataUserIsFollow.length ? (
        <div className="max-md:w-65 p-5">
          <p>No follower.</p>
        </div>
      ) : (
        dataUserIsFollow.map((follower) => (
          <Link
            to="/profile/$profileId"
            params={{ profileId: follower.id }}
            className="flex flex-col w-full justify-between items-center hover:bg-[#262626] py-3 px-6 gap-1 cursor-pointer"
            key={follower.id}
          >
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={
                      follower.photoProfile
                        ? follower.photoProfile
                        : "/default-profile-picture.png"
                    }
                  />
                </Avatar>
                <div className="flex flex-col gap-1 break-all">
                  <p className="font-bold">{follower.name}</p>
                  <p className="text-[#e8e8e8]/50 font-medium">
                    {`${"@" + follower.username}`}
                  </p>
                </div>
              </div>
              <div>
                {follower.isFollower ? (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClickUnfollowHandler({
                        targetUserId: follower.id,
                      });
                    }}
                    className={`rounded-3xl px-4 py-2 bg-transparent border-1 ${follower.isFollower ? "border-[#e8e8e8]/50 text-[#e8e8e8]/50" : "border-[#e8e8e8] text-[#e8e8e8]"}  cursor-pointer`}
                    disabled={isLoadingUnfollow}
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClickFollowHandler({
                        targetUserId: follower.id,
                        userId: userId!,
                      });
                    }}
                    className={`rounded-3xl px-4 py-2 bg-transparent border-1 ${follower.isFollower ? "border-[#e8e8e8]/50 text-[#e8e8e8]/50" : "border-[#e8e8e8] text-[#e8e8e8]"}  cursor-pointer`}
                    disabled={isLoadingFollow}
                  >
                    Follow
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full ps-14">
              <p className="lg:w-138 md:w-117 max-md:w-65 truncate">
                {follower.bio}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
