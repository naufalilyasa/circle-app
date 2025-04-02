import { Button } from "@/components/ui/button";
import { RiHome6Line } from "react-icons/ri";
import { MdOutlinePersonSearch } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BiImageAdd } from "react-icons/bi";

function LeftBar() {
  return (
    <aside className="text-[#e8e8e8] px-12 py-8 w-[25%] max-h-svh">
      <div className="flex flex-col w-full h-full justify-between">
        <div className="flex flex-col gap-5 mb-auto">
          <h1 className="text-[#04a41e] text-6xl font-bold ps-5">circle</h1>
          <div className="flex flex-col gap-4">
            <NavLink
              to={"/"}
              className="flex items-center bg-transparent rounded-3xl w-full hover:bg-black active:bg-black/50 py-3 px-5"
            >
              <RiHome6Line className="text-3xl" />
              <span className="text-lg ps-2 font-bold">Home</span>
            </NavLink>
            <button className="flex items-center bg-transparent rounded-3xl w-full hover:bg-black active:bg-black/50 py-3 px-5">
              <MdOutlinePersonSearch className="text-3xl" />
              <span className="text-lg ps-2 font-normal">Search</span>
            </button>
            <button className="flex items-center bg-transparent rounded-3xl w-full hover:bg-black active:bg-black/50 py-3 px-5">
              <FaRegHeart className="text-3xl" />
              <span className="text-lg ps-2 font-normal">Follows</span>
            </button>
            <NavLink
              to={"/my-profile"}
              className="flex items-center bg-transparent rounded-3xl w-full hover:bg-black active:bg-black/50 py-3 px-5"
            >
              <CgProfile className="text-3xl" />
              <span className="text-lg ps-2 font-normal">Profile</span>
            </NavLink>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full h-full rounded-3xl bg-[#04a41e] hover:bg-[#04a41e]/75 active:bg-[#04a41e] font-bold text-lg py-3">
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="absolute top-60 w-[60%] bg-[#1d1d1d] text-[#e8e8e8] border-none rounded-2xl pt-10 px-5 gap-10">
                <div className="flex gap-4 items-start px-5">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <textarea
                    id="article"
                    placeholder="What is happening?"
                    className="text-2xl text-[#e8e8e8] border-none focus:outline-none resize-none w-full"
                    rows={3}
                  />
                </div>
                <DialogFooter className="border-t-1 border-[#e8e8e8]/50">
                  <div className="flex justify-between items-center gap-3 w-full py-5 px-4">
                    <button className="text-4xl text-[#04a41e] hover:text-[#04a41e]/75 active:text-[#04a41e]">
                      <BiImageAdd />
                    </button>
                    <Button className="rounded-3xl bg-[#04a41e] hover:bg-[#04a41e]/75 active:bg-[#04a41e] text-base px-5">
                      Post
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-auto">
          <button className="flex items-center bg-transparent rounded-3xl w-full hover:bg-black active:bg-black/50 py-3 px-5">
            <TbLogout2 className="text-3xl" />
            <span className="text-lg ps-2 font-normal">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default LeftBar;
