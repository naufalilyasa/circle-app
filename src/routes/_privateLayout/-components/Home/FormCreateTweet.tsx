import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import useCreateTweet from "@/hooks/useCreateTweet";
import { useAuthUserStore } from "@/stores/auth";
import { convertImageToWebp } from "@/utils/convertImageToWebp";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbPhotoPlus } from "react-icons/tb";

function FormCreateTweet() {
  const [fileKey, setFileKey] = useState(Date.now());
  const [imageFile, setImageFile] = useState<string>();
  const { authUser } = useAuthUserStore();

  const {
    form,
    formState: { isSubmitSuccessful, errors },
    handleSubmit,
    isPending,
    reset,
    onSubmitCreateTweet,
  } = useCreateTweet([["getAllTweetsAndPaginated"]]);

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    reset();
    setFileKey(Date.now());
    setImageFile("");
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
      <div className="flex flex-col gap-3 text-left border-b-1 border-[#3f3f3f]">
        <div className="flex items-center gap-5 p-5 w-full">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={
                authUser?.data.user.photoProfile
                  ? authUser?.data.user.photoProfile
                  : "https://github.com/shadcn.png"
              }
            />
          </Avatar>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmitCreateTweet)}
              className="flex items-center w-full"
              encType="multipart/form-data"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-[75%]">
                    <FormControl>
                      <textarea
                        className="text-xl font-medium placeholder:text-[#909090] placeholder:max-md:text-sm max-md:text-sm w-full resize-none focus:outline-none overflow-hidden"
                        rows={1}
                        defaultValue={""}
                        {...field}
                        placeholder="What is happening?!"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-4 w-[25%]">
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
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            try {
                              const webpFile = await convertImageToWebp(file);

                              onChange(webpFile);
                              const previewImage =
                                URL.createObjectURL(webpFile);
                              setImageFile(previewImage);
                            } catch (err) {
                              console.error("Failed to convert to Webp", err);
                            }
                          }}
                          className="hidden"
                          accept="image/*"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="rounded-full bg-[#005E0E] hover:bg-[#04a41e]/75 hover:text-[#fff] active:bg-[#04a41e] text-sm px-4 py-2 text-[#909090] cursor-pointer"
                  type="submit"
                  disabled={isPending}
                >
                  Post
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="ps-5 pb-5">
          {imageFile ? (
            <div>
              <IoMdCloseCircleOutline
                className="absolute size-10 md:inset-x-218 md:inset-y-42 max-md:inset-x-54 max-md:inset-y-50 z-10 text-gray-600 hover:text-gray-400 hover:cursor-pointer"
                onClick={() => {
                  setImageFile("");
                  setFileKey(Date.now());
                }}
              />
              <img src={imageFile} className="w-[70%] h-70 ms-14 rounded-lg" />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="ps-5 py-5 text-red-500 font-semibold">
          <div>{errors.content && errors.content.message}</div>
          <div>{errors.image && errors.image.message}</div>
        </div>
      </div>
    </>
  );
}

export default FormCreateTweet;
