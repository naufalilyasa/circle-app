import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BiImageAdd } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { LiaComment } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import imagePost from "@/assets/image/white-blossom.png";

function Home() {
  return (
    <section>
      <div className="grid grid-cols-1 border-collapse">
        <div className="flex flex-col gap-6 border-2 border-[#2c2c2c] pt-10 px-5 pb-5">
          <h1 className="text-3xl font-semibold">Home</h1>
          <div className="flex gap-4 justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>test</AvatarFallback>
              </Avatar>
              <p className="text-2xl text-[#e8e8e8]/50">What is happening?!</p>
            </div>
            <div className="flex items-center pe-12 gap-3">
              <button className="text-4xl text-[#04a41e]">
                <BiImageAdd />
              </button>
              <Button className="rounded-3xl bg-[#04a41e] hover:bg-[#04a41e]/75 active:bg-[#04a41e] text-base px-5">
                Post
              </Button>
            </div>
          </div>
        </div>
        <NavLink to={"/detail-post"}>
          <article className="flex gap-5 p-5 items-start border-x-2 border-t-0 border-y-2 border-[#2c2c2c]">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>test</AvatarFallback>
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
                    <FcLike />
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
        </NavLink>
        <article className="flex gap-5 p-5 items-start border-x-2 border-t-0 border-y-2 border-[#2c2c2c]">
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
              quae fugiat perferendis? Cum, officia perspiciatis. Ducimus alias
              ratione similique pariatur tenetur eaque! Saepe id sed unde, ut
              rem corrupti, ipsam quae quibusdam magnam, consequuntur
              reprehenderit vero distinctio veniam eaque voluptatibus magni
              quidem tenetur iste repellendus. Nostrum est ipsa doloremque.
            </p>
            <div className="flex gap-3 text-[#e8e8e8]/50">
              <div className="flex gap-2">
                <button className="text-2xl">
                  <FcLike />
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
        <article className="flex gap-4 p-5 items-start border-x-2 border-t-0 border-y-2 border-[#2c2c2c]">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>test</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1.5">
              <p className="font-bold text-[#e8e8e8]">Mona</p>
              <div className="flex gap-2 text-[#e8e8e8]/50">
                <span>@nmonarizqa</span>
                <span>•</span>
                <span>17h</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in
              quae fugiat perferendis? Cum, officia perspiciatis. Ducimus alias
              ratione similique pariatur tenetur eaque! Saepe id sed unde, ut
              rem corrupti, ipsam quae quibusdam magnam, consequuntur
              reprehenderit vero distinctio veniam eaque voluptatibus magni
              quidem tenetur iste repellendus. Nostrum est ipsa doloremque.
            </p>
            <img src={imagePost} alt="" className="rounded-lg w-[70%]" />
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
    </section>
  );
}

export default Home;
