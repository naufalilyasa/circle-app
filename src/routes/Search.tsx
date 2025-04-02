import { MdOutlinePersonSearch } from "react-icons/md";

function Search() {
  return (
    <section>
      <div className="flex flex-col px-5 py-10 min-h-svh">
        <div className="flex items-center text-[#e8e8e8]/50 bg-[#383838] p-2 gap-2 rounded-3xl">
          <label htmlFor="search">
            <MdOutlinePersonSearch className="w-7 h-7 ps-1" />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search your friend"
            className="focus:outline-none w-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center h-full text-[#e8e8e8]/50 p-2 gap-2 rounded-3xl">
          <h2 className="text-[#e8e8e8]">No results for "asmorncd"</h2>
          <p className="text-[#e8e8e8]/50">
            Try searching for something else or check the spelling of what you
            typed
          </p>
        </div>
      </div>
    </section>
  );
}

export default Search;
