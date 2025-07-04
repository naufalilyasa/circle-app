import { Link, Outlet, useLocation, useRouter } from "@tanstack/react-router";
import { TbArrowLeft } from "react-icons/tb";
import { useAuthUserStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserByIdFn } from "@/api/user";
import Loading from "../-components/Other/Loading";
import ProfileCard from "../-components/ProfileLayout/ProfileCard";
import { defaultUser } from "@/defaultData";

export const Route = createFileRoute({
  component: ProfileLayout,
});

export default function ProfileLayout() {
  const router = useRouter();

  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const { authUser } = useAuthUserStore();

  const isActive = (route: string) => {
    return pathname === route;
  };

  const userId = authUser?.data.user.id;

  const { data, isLoading } = useQuery({
    queryKey: ["getUserById", userId],
    queryFn: () => {
      return getUserByIdFn(userId!);
    },
    initialData: defaultUser,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });

  if (isLoading) return <Loading size={8} />;

  return (
    <>
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
        <ProfileCard data={data} />

        {/* Tabs */}
        <div className="flex justify-between text-center font-medium gap-[10px] border-b-1 border-[#2c2c2c]">
          <Link
            to="/profile"
            className={
              isActive("/profile")
                ? "w-full py-2 mx-5 border-4 border-[#1d1d1d] hover:border-b-[#04a41e] border-b-[#04a41e]"
                : "w-full py-2 mx-5 border-4 border-[#1d1d1d] hover:border-b-[#04a41e] active:border-b-[#04a41e]"
            }
          >
            All Post
          </Link>
          <Link
            to="/profile/media"
            className={
              isActive("/profile/media")
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
    </>
  );
}
