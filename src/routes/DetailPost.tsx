import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BiImageAdd } from "react-icons/bi";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { LiaComment } from "react-icons/lia";
import { NavLink } from "react-router-dom";

function DetailPost() {
  return (
    <section>
      <div className="grid grid-cols-1 border-collapse">
        <div className="flex flex-col pt-10 pb-5 px-5 border-2 border-[#2c2c2c] gap-8">
          <div className="flex items-center text-3xl gap-3">
            <NavLink to={"/"}>
              <FaArrowLeft className="text-2xl" />
            </NavLink>
            <h1 className="font-semibold">Status</h1>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-col ps-4">
                <p>Indah Pra Karya</p>
                <p className="text-[#e8e8e8]/50">@indahpra</p>
              </div>
            </div>
            <div>
              <p className="text-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in
                quae fugiat perferendis? Cum, officia perspiciatis. Ducimus
                alias ratione similique pariatur tenetur eaque! Saepe id sed
                unde, ut rem corrupti, ipsam quae quibusdam magnam, consequuntur
                reprehenderit vero distinctio veniam eaque voluptatibus magni
                quidem tenetur iste repellendus. Nostrum est ipsa doloremque.
              </p>
            </div>
            <div>
              <div className="flex gap-1.5 text-[#e8e8e8]/50">
                <span className="">11.32 PM</span>
                <span className="text-[#e8e8e8]/50">•</span>
                <span className="text-[#e8e8e8]/50">Jun 26. 2023</span>
              </div>
            </div>
            <div className="flex gap-5 text-[#e8e8e8]/50">
              <div className="flex gap-2 items-center">
                <button className="text-2xl">
                  <FcLike />
                </button>
                <span>36</span>
              </div>
              <div className="flex gap-2 items-center">
                <button className="text-2xl">
                  <LiaComment />
                </button>
                <span>381 Replies</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-5 px-5 border-2 border-[#2c2c2c] gap-8">
          <div className="flex justify-between">
            <div className="flex gap-5 text-2xl items-center">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <p className="text-2xl text-[#e8e8e8]/50">Type your reply!</p>
            </div>
            <div className="flex items-center pe-12 gap-3">
              <button className="text-4xl text-[#04a41e] hover:text-[#04a41e]/75 active:text-[#04a41e]">
                <BiImageAdd />
              </button>
              <Button className="rounded-3xl bg-[#04a41e] hover:bg-[#04a41e]/75 active:bg-[#04a41e] text-base px-5">
                Reply
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-5 px-5 border-2 border-[#2c2c2c] gap-8">
          <article className="flex gap-5 items-start">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1.5 ">
                <p className="font-bold">Indah Pra Karya</p>
                <span className="text-[#e8e8e8]/50">@indahpra</span>
                <span className="text-[#e8e8e8]/50">•</span>
                <span className="text-[#e8e8e8]/50">4h</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in
                quae fugiat perferendis? Cum, officia perspiciatis. Ducimus
                alias ratione similique pariatur tenetur eaque! Saepe id sed
                unde, ut rem corrupti, ipsam quae quibusdam magnam, consequuntur
                reprehenderit vero distinctio veniam eaque voluptatibus magni
                quidem tenetur iste repellendus. Nostrum est ipsa doloremque.
              </p>
              <div className="flex gap-3 text-[#e8e8e8]/50">
                <div className="flex gap-2">
                  <button className="text-2xl">
                    <FaRegHeart />
                  </button>
                  <span>36</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-2xl">
                    <LiaComment />
                  </button>
                  <span>381 Replies</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default DetailPost;
