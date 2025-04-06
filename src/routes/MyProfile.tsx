import { NavLink } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { TbArrowLeft } from "react-icons/tb";
import { TbHeart } from "react-icons/tb";
// import { TbHeartFilled } from "react-icons/tb";
import { TbMessage2 } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import banner from "@/assets/image/abstract-polygonal-banner-background.jpg";
import imagePost from "@/assets/image/white-blossom.png";

function MyProfile() {
  const image1: string =
    "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE";

  return (
    <section>
      {/* Title Page */}
      <div className="pt-10 px-5 pb-2 flex items-center text-3xl gap-[10px] opacity-80">
        <NavLink to={"/"}>
          <TbArrowLeft className="w-7 h-7 stroke-1" />
        </NavLink>
        <h1 className="font-bold text-3xl">Stella Audhina</h1>
      </div>
      <div className="grid grid-cols-1 border-collapse gap-3">
        {/* Profile Info */}
        <div className="top-30 flex flex-col px-5 gap-5">
          <img src={banner} alt="" className="rounded-lg h-35 w-full" />
          <div className="flex justify-between items-end w-full">
            <div>
              <Avatar className="size-20 ms-4 -mt-24 border-4 border-[#262626]">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </div>
            <div className="">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="px-4 py-2 flex-1 w-full text-sm font-bold rounded-full border-1 border-[#FFFFFF]">
                    Edit Profile
                  </button>
                </DialogTrigger>
                <DialogContent className="absolute top-90 size-150 bg-[#1d1d1d] text-[#e8e8e8] border-none rounded-2xl pt-10 px-5 gap-5 focus:outline-none focus:border-none">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                  </DialogHeader>
                  <img src={banner} alt="" className="rounded-lg h-30 w-full" />
                  <Avatar className="w-20 h-20 ms-6 -mt-20 border-4 border-[#1d1d1d]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  {/* <BiImageAdd /> */}
                  <div className="flex flex-col gap-4 items-start">
                    <input
                      className="w-full border-1 border-[#e8e8e8]/50 p-2 text-[#e8e8e8] rounded-sm focus:outline-2 focus:outline-white"
                      type="text"
                      placeholder="Name"
                    />
                    <input
                      className="w-full border-1 border-[#e8e8e8]/50 rounded-sm text-[#e8e8e8] p-2"
                      type="text"
                      placeholder="Username"
                    />
                    <textarea
                      cols={3}
                      className="border-1 border-[#e8e8e8]/50 rounded-sm w-full text-[#e8e8e8] p-2"
                      placeholder="Bio"
                    />
                  </div>
                  <DialogFooter className="border-t-1 border-[#e8e8e8]/50">
                    <div className="flex justify-end items-center gap-3 w-full py-5 px-4">
                      <Button className="rounded-3xl bg-[#04a41e] hover:bg-[#04a41e]/75 active:bg-[#04a41e] text-base px-5">
                        Save
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Stella Audhina</h1>
              <p className="text-[#909090] text-sm">@audhinafh</p>
              <p>picked over by the worms, and weird fishes.</p>
              <div className="flex gap-2 text-base">
                <p>291</p>
                <span className="text-[#909090]">following</span>
                <p>23</p>
                <span className="text-[#909090]">followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between text-center font-medium gap-[10px] border-b-1 border-[#2c2c2c]">
          <div className="px-5 w-full">
            <button className="w-full py-2 border-4 border-[#1d1d1d] hover:border-b-[#04a41e] active:border-b-[#04a41e]">
              All Post
            </button>
          </div>
          <div className="px-5 w-full">
            <button className="w-full py-2 border-4 border-[#1d1d1d] hover:border-b-[#04a41e] active:border-b-[#04a41e]">
              Media
            </button>
          </div>
        </div>

        {/* List Post */}
        <div className="flex flex-col">
          <article className="flex gap-5 items-start py-4 px-5">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex gap-1">
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
              <div className="flex gap-3 text-[#909090]">
                <div className="flex gap-2 py-1 items-center">
                  <button className="">
                    <TbHeart className="size-6" />
                  </button>
                  <span>36</span>
                </div>
                <div className="flex gap-2 py-1 items-center">
                  <button className="">
                    <TbMessage2 className="size-6" />
                  </button>
                  <span>381 Replies</span>
                </div>
              </div>
            </div>
          </article>
          <article className="flex gap-5 items-start py-4 px-5">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex gap-1">
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
              <img
                src={imagePost}
                alt=""
                className="rounded-md w-[70%] min-w-50 max-w-100"
              />
              <div className="flex gap-3 text-[#909090]">
                <div className="flex gap-2 py-1 items-center">
                  <button className="">
                    <TbHeart className="size-6" />
                  </button>
                  <span>36</span>
                </div>
                <div className="flex gap-2 py-1 items-center">
                  <button className="">
                    <TbMessage2 className="size-6" />
                  </button>
                  <span>381 Replies</span>
                </div>
              </div>
            </div>
          </article>
          <article className="flex gap-5 items-start py-4 px-5">
            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="">
                <img src={image1} alt="" className="rounded-lg h-50" />
              </div>
              <div className="">
                <img src={image1} alt="" className="rounded-lg h-50" />
              </div>
              <div className="">
                <img src={image1} alt="" className="rounded-lg h-50" />
              </div>
              <div className="">
                <img src={image1} alt="" className="rounded-lg h-50" />
              </div>
              <div className="col-span-2">
                <img
                  src={image1}
                  alt=""
                  className="rounded-lg h-50 w-full object-cover"
                />
              </div>
              <div className="">
                <img src={image1} alt="" className="rounded-lg h-50" />
              </div>
              <div className="">
                <img src={image1} alt="" className="rounded-lg h-50" />
              </div>
              <div className="">
                <img src={image1} alt="" className="rounded-lg h-50" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default MyProfile;
