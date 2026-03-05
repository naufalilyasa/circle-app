import { Link } from "@tanstack/react-router";
import { TbHome, TbHomeFilled } from "react-icons/tb";

function HomeButton({ currentLocation }: { currentLocation: string }) {
  return (
    <>
      <Link
        to={"/"}
        className="flex lg:justify-start md:justify-center items-center bg-transparent rounded-md w-full lg:hover:bg-black py-4 px-5 gap-4"
      >
        {currentLocation === "/" ? (
          <>
            <TbHomeFilled className="w-8 h-8 stroke-0" />
            <span className="lg:text-lg lg:font-bold lg:block md:hidden">
              Home
            </span>
          </>
        ) : (
          <>
            <TbHome className="w-8 h-8 stroke-1" />
            <span className="lg:text-lg lg:font-medium lg:block md:hidden">
              Home
            </span>
          </>
        )}
      </Link>
    </>
  );
}

export default HomeButton;
