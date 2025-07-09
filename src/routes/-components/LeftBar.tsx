/* eslint-disable @typescript-eslint/no-explicit-any */
import circleLogo from "@/assets/image/circle.svg";
import { useLocation, useNavigate } from "@tanstack/react-router";
import DialogCreateTweet from "./components/DialogCreateTweet";
import HomeButton from "./components/HomeButton";
import SearchButton from "./components/SearchButton";
import FollowButton from "./components/FollowButton";
import ProfileButton from "./components/ProfileButton";
import { TbLogout2 } from "react-icons/tb";
import { useAuthUserStore } from "@/stores/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { logoutUserFn } from "@/api/auth";
import { useEffect } from "react";

function LeftBar({ isOpen }: { isOpen: boolean }) {
  const currentLocation = useLocation({
    select: (location) => location.pathname,
  });

  const { authUser, setAuthUser } = useAuthUserStore();
  const navigate = useNavigate();

  const { mutateAsync: logoutUser, isPending: isPendingLogout } = useMutation({
    mutationFn: () => logoutUserFn(),
    onSuccess: () => {
      toast.success("Successfully logged out", {
        position: "top-right",
      });
      setAuthUser(null);
      navigate({ to: "/login", replace: true });
    },
    onError: (error: any) => {
      if (Array.isArray((error as any).responses.data.error)) {
        (error as any).responses.data.error.forEach((element: any) => {
          toast.error(element.message, { position: "top-right" });
        });
      } else {
        toast.error((error as any).response.data.message, {
          position: "top-right",
        });
      }
    },
  });

  const onSubmitLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    if (!authUser) {
      navigate({ to: "/login", replace: true });
    }
  }, [authUser, navigate]);

  return (
    <>
      <aside
        className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:h-full max-md:w-64 max-md:bg-[#1d1d1d] max-md:z-50 max-md:transform max-md:transition-transform max-md:duration-300 max-md:ease-in-out ${
          isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"
        } md:relative lg:px-12 lg:py-10 lg:flex-3/12 md:w-[15%] md:px-5 md:py-5 max-md:p-5 max-md:w-[60%] max-h-full border-e-1 border-[#3F3F3F]`}
      >
        <div className="fixed lg:w-[18%] md:w-[10%] h-full pb-12">
          <div className="flex flex-col lg:w-full md:mx-auto h-full justify-between">
            <div className="flex flex-col gap-5">
              {/* Main Logo */}
              <img
                src={circleLogo}
                alt="Circle Logo"
                className="lg:w-[80%] md:w-full lg:px-5 md:px-0"
              />

              <div className="flex flex-col gap-2">
                {/* Home Button */}
                <HomeButton currentLocation={currentLocation} />

                {/* Search Button */}
                <SearchButton currentLocation={currentLocation} />

                {/* Follow Button */}
                <FollowButton currentLocation={currentLocation} />

                {/* Profile Button */}
                <ProfileButton currentLocation={currentLocation} />
              </div>
              <DialogCreateTweet />
            </div>
            <div className="mt-auto">
              {/* Logout Button */}
              <button
                onClick={onSubmitLogout}
                className="flex items-center bg-transparent rounded-md w-full lg:hover:bg-black active:bg-black/50 py-4 px-5 gap-4 cursor-pointer"
                disabled={isPendingLogout}
              >
                <TbLogout2 className="w-8 h-8 stroke-1" />
                <span className="lg:text-lg lg:font-medium lg:block md:hidden">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default LeftBar;
