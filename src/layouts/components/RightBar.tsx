import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import banner from "@/assets/image/abstract-polygonal-banner-background.jpg";

function RightBar() {
  return (
    <aside className="flex flex-col p-10 w-[35%] gap-5 max-height-svh">
      <Card className="w-full bg-[#262626] text-[#e8e8e8] border-none">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="text-xl">My Profile</CardTitle>
          <img src={banner} alt="" className="rounded-lg h-20 w-full" />
          <div className="flex justify-between items-end w-full">
            <div>
              <Avatar className="w-16 h-16 ms-4 -mt-22 border-4 border-[#262626]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>test</AvatarFallback>
              </Avatar>
            </div>
            <div className="">
              <Button variant={"outline"} className="px-5 flex-1 w-full">
                Edit Profile
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Stella Audhina</h1>
            <p className="text-[#e8e8e8]/50">@audhinafh</p>
            <p className="text-lg">
              picked over by the worms, and weird fishes.
            </p>
            <div className="flex gap-2">
              <p>291</p>
              <span className="text-[#e8e8e8]/50">following</span>
              <p>23</p>
              <span className="text-[#e8e8e8]/50">followers</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full bg-[#262626] text-[#e8e8e8] border-none">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="text-xl">Suggested for you</CardTitle>
          <div className="flex justify-between w-full">
            <div className="flex">
              <Avatar className="w-12 h-12">
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
        </CardHeader>
      </Card>
      <Card className="w-full bg-[#262626] text-[#e8e8e8] border-none">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="flex items-center gap-2 text-base font-normal">
            Developed By<span className="font-bold">Naufal</span> <span>•</span>
            <FaGithub className="w-6 h-6" />
            <FaLinkedin className="w-6 h-6" />
            <FaFacebook className="w-6 h-6" />
            <FaInstagram className="w-6 h-6" />
          </CardTitle>
          <CardContent className="text-[#e8e8e8]/50 p-0 m-0">
            Powered by DumbWays Indonesia • #1 Coding Bootcamp
          </CardContent>
        </CardHeader>
      </Card>
    </aside>
  );
}

export default RightBar;
