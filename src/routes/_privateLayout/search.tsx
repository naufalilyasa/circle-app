import { getAllUserFn } from "@/api/user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { MdOutlinePersonSearch } from "react-icons/md";
import Loading from "./-components/Other/Loading";

export const Route = createFileRoute({
  component: SearchPage,
});

function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: dataAllUsers, isLoading: isLoadingGetAllUsers } = useQuery({
    queryKey: ["getAllUsers", debouncedSearch],
    queryFn: () => getAllUserFn(debouncedSearch),
  });

  const onChangeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <section className="max-md:w-95">
      <div className="md:pt-10 md:pb-2 max-md:pt-5 gap-2.5">
        <div className="flex items-center bg-[#383838] gap-2 rounded-full py-3 px-4 mx-5">
          <label htmlFor="search">
            <MdOutlinePersonSearch className="w-7 h-7 ps-1 text-[#909090]" />
          </label>
          <input
            onChange={onChangeSearchHandler}
            id="search"
            type="text"
            placeholder="Search your friend"
            className="focus:outline-none w-full text-[#fff] placeholder:text-[#909090]"
          />
        </div>
        {isLoadingGetAllUsers ? (
          <div className="mt-10">
            <Loading size={8} />
          </div>
        ) : !dataAllUsers!.data.length ? (
          <div className="flex flex-col justify-center items-center min-h-svh p-2 max-md:px-5 gap-2 rounded-3xl">
            <h2 className="text-[#fff] font-bold text-xl">
              {`No results for "${search}"`}
            </h2>
            <p className="text-[#909090] text-sm max-md:text-center">
              Try searching for something else or check the spelling of what you
              typed
            </p>
          </div>
        ) : (
          <div className="flex flex-col min-h-svh mx-5">
            {dataAllUsers?.data.map((user) => (
              <Link
                to="/profile/$profileId"
                params={{ profileId: user.id }}
                className="flex flex-col gap-1 py-3 px-3 hover:bg-[#262626] rounded-full"
              >
                <div className="flex gap-4 w-full">
                  <Avatar className="size-10">
                    <AvatarImage
                      src={
                        user.photoProfile
                          ? user.photoProfile
                          : "default-profile-picture.png"
                      }
                    />
                  </Avatar>
                  <div className="max-md:flex justify-between max-md:w-full md:flex md:w-full">
                    <div className="flex flex-col grow gap-1 text-sm">
                      <p className="font-bold">{user.name}</p>
                      <p className="font-medium text-[#909090]">{`@${user.username}`}</p>
                    </div>
                    <button className="px-4 py-2 border-1 border-[#fff] font-bold text-sm rounded-full md:w-[15%] max-md:w-[35%]">
                      Follow
                    </button>
                  </div>
                </div>
                <div className="ps-14 py-0">
                  <p className="max-w-138 text-sm truncate">{user.bio}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
