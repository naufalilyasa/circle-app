import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { IoMdCloseCircleOutline, IoMdCreate } from "react-icons/io";
import useCreateTweet from "@/hooks/useCreateTweet";
import { useEffect, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { DialogTitle } from "@radix-ui/react-dialog";

function DialogCreateTweet() {
  const [fileKey, setFileKey] = useState(Date.now());
  const [imageFile, setImageFile] = useState<string>("");

  const {
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    isPending: isPendingCreateTweet,
    form,
    onSubmitCreateTweet,
  } = useCreateTweet([["getAllTweetsAndPaginated"]]);

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    reset();
    setFileKey(Date.now());
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    return () => {
      if (imageFile) {
        URL.revokeObjectURL(imageFile);
      }
    };
  }, [imageFile]);
  return (
    <>
      <Dialog>
        {/* Create Post Button */}
        <DialogTrigger asChild>
          <div className="flex md:justify-center items-center md:block max-md:hidden">
            <Button className="lg:w-full md:w-[50%] md:flex md:justify-center md:items-center md:mx-auto h-full rounded-full bg-[#04a41e] lg:hover:bg-[#04a41e]/75 lg:active:bg-[#04a41e] font-bold lg:py-3 lg:px-4 cursor-pointer">
              <IoMdCreate className="lg:hidden md:size-6 " />
              <span className="lg:text-xl lg:block md:hidden">Create Post</span>
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="fixed lg:inset-x-180 lg:top-[40%] md:inset-x-120 bg-[#1d1d1d] text-[#fff] rounded-2xl py-10 px-5 focus:outline-none focus:border-none">
          <DialogTitle></DialogTitle>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmitCreateTweet)}
              encType="multipart/form-data"
            >
              <div className="flex gap-4 items-start px-5 ">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          className="text-2xl border-none focus:outline-none resize-none w-full"
                          rows={3}
                          defaultValue={""}
                          key={fileKey}
                          {...field}
                          placeholder="What is happening?!"
                        />
                      </FormControl>
                      {errors.content && (
                        <p className="text-sm text-red-500">
                          {errors.content.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="ps-5 pb-5 border-b-1 border-[#3F3F3F]">
                {imageFile ? (
                  <div>
                    <IoMdCloseCircleOutline
                      className="absolute size-10 inset-x-48 z-10 text-gray-600 hover:text-gray-400 hover:cursor-pointer"
                      onClick={() => {
                        setImageFile("");
                        setFileKey(Date.now());
                      }}
                    />
                    <img src={imageFile} className="size-48 rounded-lg" />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <DialogFooter className="">
                <div className="flex justify-between items-center w-full p-5">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, ref } }) => (
                      <FormItem>
                        <FormLabel>
                          <TbPhotoPlus className="text-2xl text-[#04A51E] hover:text-[#04a41e]/75 active:text-[#04a41e] cursor-pointer" />
                        </FormLabel>
                        <FormControl>
                          <input
                            key={fileKey}
                            type="file"
                            ref={ref}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              onChange(file);
                              const previewImage = URL.createObjectURL(file);
                              setImageFile(previewImage);
                            }}
                            className="hidden"
                            accept="image/*"
                          />
                        </FormControl>
                        {errors.content && (
                          <p className="text-sm text-red-500">
                            {errors.content.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                  <Button
                    className="rounded-full bg-[#005E0E] hover:bg-[#04a41e]/75 hover:text-[#fff] active:bg-[#04a41e] px-4 py-2 text-[#909090] cursor-pointer"
                    type="submit"
                    disabled={isPendingCreateTweet}
                  >
                    <span className="text-sm">Post</span>
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogCreateTweet;
