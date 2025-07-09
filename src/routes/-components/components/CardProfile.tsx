import { getUserByIdFn } from "@/api/user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultDataUserById } from "@/defaultData";
import { useAuthUserStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import Loading from "@/routes/_privateLayout/-components/Other/Loading";

function CardProfile() {
  const { authUser } = useAuthUserStore();
  const userId = authUser!.data.user.id;

  const { data, isLoading } = useQuery({
    queryKey: ["getUserById", userId],
    queryFn: () => getUserByIdFn(userId!),
    enabled: !!userId,
    placeholderData: defaultDataUserById,
  });

  if (isLoading)
    return (
      <div className="mt-20 flex justify-center items-center mx-auto">
        <Loading size={8} />;
      </div>
    );
  return (
    <>
      <Card className="w-full bg-[#262626] text-[#fff] border-none">
        <div className="flex flex-col gap-1">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="text-xl">My Profile</CardTitle>
            <img
              src={data?.banner ? data.banner : "default-banner.jpg"}
              alt=""
              className="rounded-lg h-25 w-full"
            />
            <div className="flex justify-between items-end w-full">
              <div>
                <Avatar className="w-20 h-20 ms-4 -mt-22 border-4 border-[#262626]">
                  <AvatarImage
                    src={
                      !data?.photoProfile
                        ? "https://github.com/shadcn.png"
                        : data?.photoProfile
                    }
                  />
                </Avatar>
              </div>
              <div className="">
                <Link
                  to={"/profile"}
                  className="px-4 py-2 flex-1 w-full text-sm font-bold rounded-full border-1 border-[#FFFFFF]"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1 mt-2">
              <h1 className="text-2xl font-bold">{data?.name}</h1>
              <p className="text-[#909090] text-sm">@{data?.username}</p>
              <p className="text-base">{data?.bio}</p>
              <div className="flex py-1 gap-3">
                <div className="flex gap-1">
                  <p className="font-bold">
                    {data?._count.followings ? data._count.followings : "0"}
                  </p>
                  <span className="text-[#909090]">following</span>
                </div>
                <div className="flex gap-1">
                  <p className="font-bold">
                    {data?._count.followers ? data._count.followers : "0"}
                  </p>
                  <span className="text-[#909090]">followers</span>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
}

export default CardProfile;
