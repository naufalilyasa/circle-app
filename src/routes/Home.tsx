import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TbPhotoPlus } from "react-icons/tb";
import { TbHeart } from "react-icons/tb";
import { TbHeartFilled } from "react-icons/tb";
import { TbMessage2 } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import imagePost from "@/assets/image/white-blossom.png";

function Home() {
  return (
    <section className="h-full">
      <div className="grid grid-cols-1 border-collapse">
        {/* Home header */}
        <div className="pt-10 px-5 pb-2 opacity-80 border-b-1 border-[#3f3f3f]">
          <h1 className="text-3xl font-semibold">Home</h1>
        </div>
        <div className="flex flex-col gap-3 text-left">
          {/* Form status post */}
          <div className="flex items-center gap-5 p-5 w-full border-b-1 border-[#3f3f3f]">
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
            <button className="text-2xl text-[#04A51E] hover:text-[#04a41e]/75 active:text-[#04a41e]">
              <TbPhotoPlus />
            </button>
            <Button className="rounded-full bg-[#005E0E] hover:bg-[#04a41e]/75 hover:text-[#fff] active:bg-[#04a41e] text-sm px-4 py-2 text-[#909090]">
              Post
            </Button>
          </div>
        </div>

        {/* Post List */}
        <NavLink to={"/detail-post"}>
          <article className="flex gap-4 px-5 py-4 items-start border-b-1 border-[#2c2c2c]">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 text-sm">
                <p className="font-bold">Indah Pra Karya</p>
                <span className="text-[#909090] font-medium">@indahpra</span>
                <span className="text-[#909090] font-medium">•</span>
                <span className="text-[#909090] font-medium">4h</span>
              </div>
              <p className="text-sm font-normal">
                Kalian pernah ga sih bet on saving? Jadi by calculation
                sebenernya kita ga survive sampe tanggal tertentu. Tapi entah
                gimana bisa aja gitu. Ada aja jalannya augmented reality real
                time puppet I made. You can try it now went below in the thread.
              </p>
              <div className="flex gap-3 text-[#909090] text-sm font-normal">
                <div className="flex gap-2 items-center py-1">
                  <button className="flex justify-center items-center">
                    <TbHeartFilled className="w-6 h-6 fill-[#D71913] stroke-[#D71913]" />
                  </button>
                  <span>36</span>
                </div>
                <div className="flex gap-2 items-center py-1">
                  <button className="flex justify-center items-center">
                    <TbMessage2 className="w-6 h-6" />
                  </button>
                  <span>381 Replies</span>
                </div>
              </div>
            </div>
          </article>
        </NavLink>
        <article className="flex gap-4 px-5 py-4 items-start border-b-1 border-[#2c2c2c]">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 text-sm">
              <p className="font-bold">Indah Pra Karya</p>
              <span className="text-[#909090] font-medium">@indahpra</span>
              <span className="text-[#909090] font-medium">•</span>
              <span className="text-[#909090] font-medium">4h</span>
            </div>
            <p className="text-sm font-normal">
              Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya
              kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja
              gitu. Ada aja jalannya augmented reality real time puppet I made.
              You can try it now went below in the thread.
            </p>
            <div className="flex gap-3 text-[#909090] text-sm font-normal">
              <div className="flex gap-2 items-center py-1">
                <button className="flex justify-center items-center">
                  <TbHeart className="w-6 h-6" />
                </button>
                <span>36</span>
              </div>
              <div className="flex gap-2 items-center py-1">
                <button className="flex justify-center items-center">
                  <TbMessage2 className="w-6 h-6" />
                </button>
                <span>381 Replies</span>
              </div>
            </div>
          </div>
        </article>
        <article className="flex gap-4 px-5 py-4 items-start border-b-1 border-[#2c2c2c]">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 text-sm">
              <p className="font-bold">Indah Pra Karya</p>
              <span className="text-[#909090] font-medium">@indahpra</span>
              <span className="text-[#909090] font-medium">•</span>
              <span className="text-[#909090] font-medium">4h</span>
            </div>
            <p className="text-sm font-normal">
              Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya
              kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja
              gitu. Ada aja jalannya augmented reality real time puppet I made.
              You can try it now went below in the thread.
            </p>
            <img src={imagePost} alt="" className="rounded-lg w-[70%]" />
            <div className="flex gap-3 text-[#909090] text-sm font-normal">
              <div className="flex gap-2 items-center py-1">
                <button className="flex justify-center items-center">
                  <TbHeart className="w-6 h-6" />
                </button>
                <span>36</span>
              </div>
              <div className="flex gap-2 items-center py-1">
                <button className="flex justify-center items-center">
                  <TbMessage2 className="w-6 h-6" />
                </button>
                <span>381 Replies</span>
              </div>
            </div>
          </div>
        </article>
        <article className="flex gap-4 px-5 py-4 items-start border-b-1 border-[#2c2c2c]">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 text-sm">
              <p className="font-bold">Indah Pra Karya</p>
              <span className="text-[#909090] font-medium">@indahpra</span>
              <span className="text-[#909090] font-medium">•</span>
              <span className="text-[#909090] font-medium">4h</span>
            </div>
            <p className="text-sm font-normal">
              Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya
              kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja
              gitu. Ada aja jalannya augmented reality real time puppet I made.
              You can try it now went below in the thread.
            </p>
            <img src={imagePost} alt="" className="rounded-lg w-[70%]" />
            <div className="flex gap-3 text-[#909090] text-sm font-normal">
              <div className="flex gap-2 items-center py-1">
                <button className="flex justify-center items-center">
                  <TbHeart className="w-6 h-6" />
                </button>
                <span>36</span>
              </div>
              <div className="flex gap-2 items-center py-1">
                <button className="flex justify-center items-center">
                  <TbMessage2 className="w-6 h-6" />
                </button>
                <span>381 Replies</span>
              </div>
            </div>
          </div>
        </article>
        <article className="flex gap-4 px-5 py-4 items-start border-b-1 border-[#2c2c2c]">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 text-sm">
              <p className="font-bold">Indah Pra Karya</p>
              <span className="text-[#909090] font-medium">@indahpra</span>
              <span className="text-[#909090] font-medium">•</span>
              <span className="text-[#909090] font-medium">4h</span>
            </div>
            <p className="text-sm font-normal">
              Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya
              kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja
              gitu. Ada aja jalannya augmented reality real time puppet I made.
              You can try it now went below in the thread.
            </p>
            <img src={imagePost} alt="" className="rounded-lg w-[70%]" />
            <div className="flex gap-3 text-[#909090] text-sm font-normal">
              <div className="flex gap-2 items-center py-1">
                <button className="flex justify-center items-center">
                  <TbHeart className="w-6 h-6" />
                </button>
                <span>36</span>
              </div>
              <div className="flex gap-2 items-center py-1">
                <button className="flex justify-center items-center">
                  <TbMessage2 className="w-6 h-6" />
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
