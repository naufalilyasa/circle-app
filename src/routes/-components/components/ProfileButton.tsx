import { Link } from "@tanstack/react-router";
import { TbUserCircle } from "react-icons/tb";

function ProfileButton({ currentLocation }: { currentLocation: string }) {
  return (
    <>
      <Link
        to={"/profile"}
        className="flex lg:justify-start md:justify-center items-center bg-transparent rounded-md w-full lg:hover:bg-black py-4 px-5 gap-4"
      >
        {currentLocation === "/profile" ? (
          <>
            <TbUserCircle className="w-8 h-8 stroke-2" />
            <span className="lg:text-lg lg:font-bold lg:block md:hidden">
              Profile
            </span>
          </>
        ) : (
          <>
            <TbUserCircle className="w-8 h-8 stroke-1" />
            <span className="lg:text-lg lg:font-medium lg:block md:hidden">
              Profile
            </span>
          </>
        )}
      </Link>
    </>
  );
}

export default ProfileButton;
