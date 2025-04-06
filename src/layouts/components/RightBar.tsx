import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import banner from "@/assets/image/abstract-polygonal-banner-background.jpg";
import dumbwaysLogo from "@/assets/image/dumbways-logo.png";
import { NavLink } from "react-router-dom";

function RightBar() {
  return (
    <aside className="p-10 w-[32%] border-s-1 border-[#3f3f3f] max-height-svh">
      <div className="flex flex-col gap-5">
        <Card className="w-full bg-[#262626] text-[#fff] border-none">
          <div className="flex flex-col gap-1">
            <CardHeader className="flex flex-col gap-5">
              <CardTitle className="text-xl">My Profile</CardTitle>
              <img src={banner} alt="" className="rounded-lg h-25 w-full" />
              <div className="flex justify-between items-end w-full">
                <div>
                  <Avatar className="w-20 h-20 ms-4 -mt-25 border-4 border-[#262626]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </div>
                <div className="">
                  <button className="px-4 py-2 flex-1 w-full text-sm font-bold rounded-full border-1 border-[#FFFFFF]">
                    Edit Profile
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Stella Audhina</h1>
                <p className="text-[#909090] text-sm">@audhinafh</p>
                <p className="text-base">
                  picked over by the worms, and weird fishes.
                </p>
                <div className="flex py-1 gap-3">
                  <div className="flex gap-1">
                    <p className="font-bold">291</p>
                    <span className="text-[#909090]">following</span>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-bold">23</p>
                    <span className="text-[#909090]">followers</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
        <Card className="w-full bg-[#262626] text-[#fff] border-none">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="text-xl">Suggested for you</CardTitle>
            <NavLink to={"/profile"} className={"w-full"}>
              <div className="flex justify-between items-center">
                <div className="flex">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>test</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col ps-4">
                    <p className="font-bold">Mohammed Jawahir</p>
                    <p className="text-[#e8e8e8]/50">@em.jawahir</p>
                  </div>
                </div>
                <div className="">
                  <Button className="rounded-3xl bg-transparent border-1 border-[#e8e8e8]/50 text-[#e8e8e8]/50">
                    Following
                  </Button>
                </div>
              </div>
            </NavLink>
            <div className="flex justify-between w-full">
              <div className="flex">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <div className="flex flex-col ps-4">
                  <p className="font-bold">Mohammed Jawahir</p>
                  <p className="text-[#e8e8e8]/50">@em.jawahir</p>
                </div>
              </div>
              <div className="">
                <Button className="rounded-3xl bg-transparent border-1 border-[#e8e8e8] text-[#e8e8e8]">
                  Follow
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card className="w-full bg-[#262626] text-[#e8e8e8] border-none">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="flex items-center text-base font-medium gap-2">
              <span>
                Developed By
                <span className="font-bold"> Naufal </span>
              </span>
              <span className="text-xs text-[#B2B2B2]">•</span>
              <FaGithub className="w-6 h-6 text-[#B2B2B2]" />
              <FaLinkedin className="w-6 h-6 text-[#B2B2B2]" />
              <FaFacebook className="w-6 h-6 text-[#B2B2B2]" />
              <FaInstagram className="w-6 h-6 text-[#B2B2B2]" />
            </CardTitle>
            <CardContent className="flex flex-wrap text-[#B2B2B2] text-sm p-0 m-0 gap-1">
              <span className="">Powered by</span>
              <span className="flex items-center px-1">
                <img src={dumbwaysLogo} alt="" className="h-3 w-6" />
              </span>
              <p>DumbWays Indonesia</p>
              <p>•</p>
              <p>#1 Coding Bootcamp</p>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </aside>
  );
}

export default RightBar;
