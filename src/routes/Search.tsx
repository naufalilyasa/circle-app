import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MdOutlinePersonSearch } from "react-icons/md";

function Search() {
  return (
    <section>
      <div className="pt-10 px-5 pb-2 gap-2.5">
        <div className="flex items-center bg-[#383838] gap-2 rounded-full py-3 px-4">
          <label htmlFor="search">
            <MdOutlinePersonSearch className="w-7 h-7 ps-1 text-[#909090]" />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search your friend"
            className="focus:outline-none w-full text-[#fff] placeholder:text-[#909090]"
          />
        </div>
        <div className="flex flex-col min-h-svh">
          <div className="flex flex-col gap-1 py-3">
            <div className="flex gap-4 w-full">
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-col grow gap-1 text-sm">
                <p className="font-bold">Rach</p>
                <p className="font-medium text-[#909090]">@fortherAch</p>
              </div>
              <button className="px-4 py-2 border-1 border-[#fff] font-bold text-sm rounded-full w-[15%]">
                Follow
              </button>
            </div>
            <div className="ps-14 py-0">
              <p className="text-sm">All for Jesus and the A #GoBraves</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 py-3">
            <div className="flex gap-4 w-full">
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-col grow gap-1 text-sm">
                <p className="font-bold">Rach</p>
                <p className="font-medium text-[#909090]">@fortherAch</p>
              </div>
              <button className="px-4 py-2 border-1 border-[#fff] font-bold text-sm rounded-full w-[15%]">
                Follow
              </button>
            </div>
            <div className="ps-14 py-0">
              <p className="text-sm">All for Jesus and the A #GoBraves</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center min-h-svh p-2 gap-2 rounded-3xl">
            <h2 className="text-[#fff] font-bold text-xl">
              No results for "asmorncd"
            </h2>
            <p className="text-[#909090] text-sm">
              Try searching for something else or check the spelling of what you
              typed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Search;
