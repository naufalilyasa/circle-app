import { Button } from "@/components/ui/button";
import { RiHome6Line } from "react-icons/ri";
import { MdOutlinePersonSearch } from "react-icons/md";
import { SlUserFollow } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";

function LeftBar() {
  return (
    <section className="text-[#e8e8e8] px-12 py-8 w-90 h-screen">
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-[#04a41e] text-6xl font-bold ps-5">circle</h1>
        <div className="flex flex-col gap-4">
          <button className="flex items-center bg-transparent rounded-3xl w-full hover:bg-black active:bg-black/50 py-3 px-5">
            <RiHome6Line className="text-3xl" />
            <span className="text-lg ps-2 font-bold">Home</span>
          </button>
          <button className="flex items-center bg-transparent rounded-3xl w-full hover:bg-black active:bg-black/50 py-3 px-5">
            <MdOutlinePersonSearch className="text-3xl" />
            <span className="text-lg ps-2 font-normal">Search</span>
          </button>
          <button className="flex items-center bg-transparent rounded-3xl w-full hover:bg-black active:bg-black/50 py-3 px-5">
            <FaRegHeart className="text-3xl" />
            <span className="text-lg ps-2 font-normal">Follows</span>
          </button>
          <button className="flex items-center bg-transparent rounded-3xl w-full hover:bg-black active:bg-black/50 py-3 px-5">
            <CgProfile className="text-3xl" />
            <span className="text-lg ps-2 font-normal">Profile</span>
          </button>
        </div>
        <div>
          <Button className="w-full h-full rounded-3xl bg-[#04a41e] hover:bg-[#04a41e]/75 active:bg-[#04a41e] font-bold text-lg py-3">
            Create Post
          </Button>
        </div>
        <div className="mt-70">
          <button className="flex items-center bg-transparent rounded-3xl w-full hover:bg-black active:bg-black/50 py-3 px-5">
            <TbLogout2 className="text-3xl" />
            <span className="text-lg ps-2 font-normal">Logout</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default LeftBar;
