import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa";
import { LiaComment } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import banner from "@/assets/image/abstract-polygonal-banner-background.jpg";
import { Button } from "@/components/ui/button";
import imagePost from "@/assets/image/white-blossom.png";

function MyProfile() {
  const image1: string =
    "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE";

  return (
    <section>
      <div className="grid grid-cols-1 border-collapse">
        <div className="flex flex-col pt-10 px-5 border-2 border-[#2c2c2c] gap-5">
          <div className="flex items-center text-3xl gap-3">
            <NavLink to={"/"}>
              <FaArrowLeft className="text-2xl" />
            </NavLink>
            <h1 className="font-medium">Stella Audhina</h1>
          </div>
          <img src={banner} alt="" className="rounded-lg h-40 w-full" />
          <div className="flex justify-between items-end w-full">
            <div>
              <Avatar className="w-20 h-20 ms-4 -mt-24 border-4 border-[#262626]">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </div>
            <div className="">
              <Button variant={"outline"} className="px-5 flex-1 w-full">
                Edit Profile
              </Button>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold">Stella Audhina</h1>
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
          </div>
          <div className="flex justify-between text-center">
            <button className="w-full border-3 border-[#1d1d1d] hover:border-b-[#04a41e] active:border-b-[#04a41e]">
              All Post
            </button>
            <button className="w-full border-3 border-[#1d1d1d] hover:border-b-[#04a41e] active:border-b-[#04a41e]">
              Media
            </button>
          </div>
        </div>
        <div className="flex flex-col py-5 px-5 border-2 border-[#2c2c2c] gap-8">
          <article className="flex gap-5 items-start">
            {/* <Avatar className="w-10 h-10">
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
            </div> */}
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
