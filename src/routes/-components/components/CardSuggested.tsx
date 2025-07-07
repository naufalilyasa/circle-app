import { getSuggestedFollowers } from "@/api/follow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultDataSuggestedFollowers } from "@/defaultData";
import useFollowUnfollow from "@/hooks/useFollowUnfollow";
import Loading from "@/routes/_privateLayout/-components/Other/Loading";
import { useAuthUserStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

function CardSuggested() {
  const { authUser } = useAuthUserStore();
  const userId = authUser!.data.user.id;

  const { data: suggestedFollowers, isLoading: isLoadingsuggestedFollowers } =
    useQuery({
      queryKey: ["getSuggestedFollowers", userId],
      queryFn: () => getSuggestedFollowers(userId!),
      initialData: defaultDataSuggestedFollowers,
    });

  const {
    isLoadingFollow,
    isLoadingUnfollow,
    onClickFollowHandler,
    onClickUnfollowHandler,
  } = useFollowUnfollow([["getSuggestedFollowers"]]);

  if (isLoadingsuggestedFollowers) return <Loading size={8} />;
  return (
    <>
      <Card className="w-full bg-[#262626] text-[#fff] border-none">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="text-xl">Suggested for you</CardTitle>
          {suggestedFollowers?.map((user) => (
            <Link
              to={`/profile/$profileId`}
              params={{ profileId: user.id }}
              className={"w-full"}
              key={user.id}
            >
              <div className="flex justify-between items-center hover:bg-[#1d1d1d] rounded-full py-2 px-4">
                <div className="flex items-center">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>test</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col ps-4 break-all">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-[#e8e8e8]/50">@{user.username}</p>
                  </div>
                </div>
                <div className="">
                  {user.isFollow ? (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClickUnfollowHandler({
                          targetUserId: user.id,
                        });
                      }}
                      className={`rounded-3xl px-4 py-2 bg-transparent border-1 ${user.isFollow ? "border-[#e8e8e8]/50 text-[#e8e8e8]/50" : "border-[#e8e8e8] text-[#e8e8e8]"} cursor-pointer`}
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
                          targetUserId: user.id,
                          userId: userId!,
                        });
                      }}
                      className={`rounded-3xl px-4 py-2 bg-transparent border-1 ${user.isFollow ? "border-[#e8e8e8]/50 text-[#e8e8e8]/50" : "border-[#e8e8e8] text-[#e8e8e8]"} cursor-pointer`}
                      disabled={isLoadingFollow}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </CardHeader>
      </Card>
    </>
  );
}

export default CardSuggested;
