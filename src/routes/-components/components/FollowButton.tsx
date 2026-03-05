import { Link } from "@tanstack/react-router";
import { TbHeart, TbHeartFilled } from "react-icons/tb";

function FollowButton({ currentLocation }: { currentLocation: string }) {
  return (
    <>
      <Link
        to="/followers"
        className="flex lg:justify-start md:justify-center items-center bg-transparent rounded-md w-full lg:hover:bg-black py-4 px-5 gap-4"
      >
        {currentLocation === "/followers" ||
        currentLocation === "/followings" ? (
          <>
            <TbHeartFilled className="w-8 h-8" />
            <span className="lg:text-lg lg:font-bold lg:block md:hidden">
              Follows
            </span>
          </>
        ) : (
          <>
            <TbHeart className="w-8 h-8 stroke-1" />
            <span className="lg:text-lg lg:font-medium lg:block md:hidden">
              Follows
            </span>
          </>
        )}
      </Link>
    </>
  );
}

export default FollowButton;
