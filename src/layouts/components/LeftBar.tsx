import { Button } from "@/components/ui/button";
import { TbHomeFilled } from "react-icons/tb";
import { TbUserSearch } from "react-icons/tb";
import { TbUserCircle } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { TbHeart } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BiImageAdd } from "react-icons/bi";
import circleLogo from "@/assets/image/circle.svg";

function LeftBar() {
  return (
    <aside className="relative px-12 py-10 w-[24%] max-h-full border-e-1 border-[#3F3F3F]">
      <div className="fixed w-[18%] h-full pb-12">
        <div className="flex flex-col w-full h-full justify-between">
          <div className="flex flex-col gap-5">
            {/* Main Logo */}
            <img
              src={circleLogo}
              alt="Circle Logo"
              className="w-[80%] px-5 fill-amber-500"
            />

            {/* Home Button */}
            <div className="flex flex-col gap-2">
              <NavLink
                to={"/"}
                className="flex items-center bg-transparent rounded-md w-full hover:bg-black active:bg-black/50 py-4 px-5 gap-4"
              >
                <TbHomeFilled className="w-8 h-8 stroke-0" />
                <span className="text-lg font-bold">Home</span>
              </NavLink>

              {/* Search Button */}
              <NavLink
                to={"/search"}
                className="flex items-center bg-transparent rounded-md w-full hover:bg-black active:bg-black/50 py-4 px-5 gap-4"
              >
                <TbUserSearch className="w-8 h-8 stroke-1" />
                <span className="text-lg font-medium">Search</span>
              </NavLink>

              {/* Follow Button */}
              <button className="flex items-center bg-transparent rounded-md w-full hover:bg-black active:bg-black/50 py-4 px-5 gap-4">
                <TbHeart className="w-8 h-8 stroke-1" />
                <span className="text-lg font-medium">Follows</span>
              </button>

              {/* Profile Button */}
              <NavLink
                to={"/my-profile"}
                className="flex items-center bg-transparent rounded-md w-full hover:bg-black active:bg-black/50 py-4 px-5 gap-4"
              >
                <TbUserCircle className="w-8 h-8 stroke-1" />
                <span className="text-lg font-medium">Profile</span>
              </NavLink>
            </div>
            <div>
              <Dialog>
                {/* Create Post Button */}
                <DialogTrigger asChild>
                  <Button className="w-full h-full rounded-full bg-[#04a41e] hover:bg-[#04a41e]/75 active:bg-[#04a41e] font-bold text-xl py-3 px-4">
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="absolute top-[10%] bg-[#1d1d1d] text-[#fff] rounded-2xl py-10 px-5 focus:outline-none focus:border-none">
                  <div className="flex gap-4 items-start px-5 border-b-1 border-[#3F3F3F]">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <textarea
                      id="article"
                      placeholder="What is happening?"
                      className="text-2xl border-none focus:outline-none resize-none w-full"
                      rows={3}
                    />
                  </div>
                  <DialogFooter className="">
                    <div className="flex justify-between items-center w-full p-5">
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
            {/* Logout Button */}
            <button className="flex items-center bg-transparent rounded-md w-full hover:bg-black active:bg-black/50 py-4 px-5 gap-4">
              <TbLogout2 className="w-8 h-8 stroke-1" />
              <span className="text-lg font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default LeftBar;
