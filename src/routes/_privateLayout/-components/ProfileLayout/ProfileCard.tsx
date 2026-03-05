import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthUserStore } from "@/stores/auth";
import { UserResponse } from "@/types/user";
import DialogFormEditProfile from "./DialogFormEditProfile";

function ProfileCard({ data }: { data: UserResponse }) {
  const { authUser } = useAuthUserStore();
  return (
    <>
      <div className="top-30 flex flex-col px-5 gap-5">
        <img
          src={
            authUser?.data.user.banner
              ? authUser.data.user.banner
              : "default-banner.jpg"
          }
          alt=""
          className="rounded-lg h-35 w-full"
        />
        <div className="flex justify-between items-end w-full">
          <div>
            <Avatar className="size-20 ms-4 -mt-24 border-4 border-[#262626]">
              <AvatarImage
                src={
                  authUser?.data.user.photoProfile
                    ? authUser?.data.user.photoProfile
                    : "https://github.com/shadcn.png"
                }
              />
            </Avatar>
          </div>
          <div className="flex">
            {/* Dialog Form Edit Profile */}
            <DialogFormEditProfile data={data} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{data?.name}</h1>
            <p className="text-[#909090] text-sm">@{data?.username}</p>
            <p>{data?.bio}</p>
            <div className="flex gap-2 text-base">
              <p>{data._count.followings ? data._count.followings : "0"}</p>
              <span className="text-[#909090]">following</span>
              <p>{data._count.followers ? data._count.followers : "0"}</p>
              <span className="text-[#909090]">followers</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
