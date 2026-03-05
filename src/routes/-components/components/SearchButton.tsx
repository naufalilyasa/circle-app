import { Link } from "@tanstack/react-router";
import { TbUserSearch } from "react-icons/tb";

function SearchButton({ currentLocation }: { currentLocation: string }) {
  return (
    <>
      <Link
        to={"/search"}
        className="flex lg:justify-start md:justify-center items-center bg-transparent rounded-md w-full lg:hover:bg-black py-4 px-5 gap-4"
      >
        {currentLocation === "/search" ? (
          <>
            <TbUserSearch className="w-8 h-8 stroke-3" />
            <span className="lg:text-lg lg:font-bold lg:block md:hidden">
              Search
            </span>
          </>
        ) : (
          <>
            <TbUserSearch className="w-8 h-8 stroke-1" />
            <span className="lg:text-lg lg:font-medium lg:block md:hidden">
              Search
            </span>
          </>
        )}
      </Link>
    </>
  );
}

export default SearchButton;
