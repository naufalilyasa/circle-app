import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import useUpdateTweet from "@/hooks/useUpdateTweet";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbPhotoPlus } from "react-icons/tb";

interface TweetPropsType {
  id: string;
  content: string;
  imageUrl: string;
  authorId: string;
  photoProfile: string | undefined;
}

function FormEditTweet({ tweetProps }: { tweetProps: TweetPropsType }) {
  const [fileKey, setFileKey] = useState(Date.now());
  const [imageFile, setImageFile] = useState<string>(tweetProps.imageUrl);

  const {
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    isPendingUpdateTweet,
    form,
    onSubmitUpdateTweet,
    setValue,
  } = useUpdateTweet({ tweetId: tweetProps.id, queryKeys: [["getAllTweets"]] });

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

  setValue("content", tweetProps.content);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" text-white p-2 hover:bg-[#1d1d1d] cursor-pointer rounded-md">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#1d1d1d] text-[#e8e8e8] border-none">
        <div className="flex flex-col justify-start gap-2 w-full px-3">
          <DialogTitle className="justify-start">Edit Tweet</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmitUpdateTweet)}
            encType="multipart/form-data"
            className="w-full"
          >
            <div className="flex gap-4 items-start ps-3 w-full mb-5">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={
                    tweetProps.photoProfile
                      ? tweetProps.photoProfile
                      : "default-photo-profile.png"
                  }
                />
              </Avatar>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-[80%]">
                    <FormControl>
                      <textarea
                        className="text-lg placeholder:text-2xl border-none focus:outline-none resize-none w-full"
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
                    className="absolute size-10 md:inset-x-60 md:inset-y-44 max-md:inset-x-54 max-md:inset-y-50 z-10 text-gray-600 hover:text-gray-400 hover:cursor-pointer"
                    onClick={() => {
                      setImageFile("");
                      setFileKey(Date.now());
                    }}
                  />
                  <img
                    src={imageFile}
                    className="size-48 md:w-[50%] max-md:w-[70%] rounded-lg"
                  />
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
                  className="rounded-full bg-[#005E0E] hover:bg-[#04a41e]/75 hover:text-[#fff] active:bg-[#04a41e] text-sm px-4 py-2 text-[#909090] cursor-pointer"
                  type="submit"
                  disabled={isPendingUpdateTweet}
                >
                  Edit Tweet
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default FormEditTweet;
