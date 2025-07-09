import circleLogo from "@/assets/image/circle.svg";
import { useLocation } from "@tanstack/react-router";
import DialogCreateTweet from "./components/DialogCreateTweet";
import HomeButton from "./components/HomeButton";
import SearchButton from "./components/SearchButton";
import FollowButton from "./components/FollowButton";
import ProfileButton from "./components/ProfileButton";
import LogoutButton from "./components/LogoutButton";

function LeftBar({ isOpen }: { isOpen: boolean }) {
  const currentLocation = useLocation({
    select: (location) => location.pathname,
  });

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
              <LogoutButton />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default LeftBar;
