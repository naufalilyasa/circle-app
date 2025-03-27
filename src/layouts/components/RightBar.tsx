import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function RightBar() {
  return (
    <section className="flex flex-col p-10 w-135 gap-5">
      <Card className="w-full bg-[#262626] text-[#e8e8e8] border-none">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="text-xl">My Profile</CardTitle>
          <img src="" alt="" />
          <div className="flex justify-between items-end w-full">
            <div className="">
              <Avatar className="w-12 h-12">
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
    </section>
  );
}

export default RightBar;
