import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TbArrowLeft } from "react-icons/tb";
import { TbPhotoPlus } from "react-icons/tb";
import { TbHeart } from "react-icons/tb";
import { TbHeartFilled } from "react-icons/tb";
import { TbMessage2 } from "react-icons/tb";
import { NavLink } from "react-router-dom";

function DetailPost() {
  return (
    <section>
      <div className="grid grid-cols-1 border-collapse">
        <div className="flex flex-col pt-10 pb-2 px-5 border-1 border-[#3f3f3f] gap-8">
          <div className="flex items-center text-3xl gap-[10px] opacity-80">
            <NavLink to={"/"}>
              <TbArrowLeft className="w-7 h-7 stroke-1" />
            </NavLink>
            <h1 className="font-bold text-3xl">Status</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-col text-sm">
                <p className="font-bold">Indah Pra Karya</p>
                <p className="text-[#909090] font-medium">@indahpra</p>
              </div>
            </div>
            <div>
              <p className="text-sm">
                Kalian pernah ga sih bet on saving? Jadi by calculation
                sebenernya kita ga survive sampe tanggal tertentu. Tapi entah
                gimana bisa aja gitu. Ada aja jalannya
              </p>
            </div>
            <div>
              <div className="flex gap-1 text-[#909090] text-sm">
                <span className="">11.32 PM</span>
                <span className="text-[#909090]">•</span>
                <span className="text-[#909090]">Jun 26. 2023</span>
              </div>
            </div>
            <div className="flex gap-3 text-[#909090]">
              <div className="flex gap-2 py-1 items-center">
                <button className="">
                  <TbHeartFilled className="w-6 h-6 fill-[#D71913] stroke-[#D71913]" />
                </button>
                <span>36</span>
              </div>
              <div className="flex gap-2 py-1 items-center">
                <button className="text-2xl">
                  <TbMessage2 className="w-6 h-6" />
                </button>
                <span>381 Replies</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-5 border-2 border-[#2c2c2c] gap-8">
          <div className="flex justify-between">
            <div className="flex gap-5 text-2xl items-center">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <textarea
                name=""
                id=""
                className="text-xl font-medium placeholder:text-[#909090] w-full resize-none focus:outline-none overflow-hidden"
                rows={1}
                placeholder="What is happening?!"
              />
            </div>
            <div className="flex items-center pe-12 gap-3">
              <button className="text-2xl text-[#04A51E] hover:text-[#04a41e]/75 active:text-[#04a41e]">
                <TbPhotoPlus />
              </button>
              <Button className="rounded-full bg-[#005E0E] hover:bg-[#04a41e]/75 hover:text-[#fff] active:bg-[#04a41e] text-sm px-4 py-2 text-[#909090]">
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
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex gap-1 font-medium">
                <p className="font-bold">Indah Pra Karya</p>
                <span className="text-[#909090]">@indahpra</span>
                <span className="text-[#909090]">•</span>
                <span className="text-[#909090]">4h</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in
                quae fugiat perferendis? Cum, officia perspiciatis. Ducimus
                alias ratione similique pariatur tenetur eaque! Saepe id sed
                unde, ut rem corrupti, ipsam quae quibusdam magnam, consequuntur
                reprehenderit vero distinctio veniam eaque voluptatibus magni
                quidem tenetur iste repellendus. Nostrum est ipsa doloremque.
              </p>
              <div className="flex gap-3 text-[#909090] font-normal">
                <div className="flex items-center gap-2 py-1">
                  <button className="text-2xl">
                    <TbHeart className="w-6 h-6" />
                  </button>
                  <span>36</span>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <button className="">
                    <TbMessage2 className="w-6 h-6" />
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
