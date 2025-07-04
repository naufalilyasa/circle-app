import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
import { Input } from "@/components/ui/input";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { UpdateUserDTO, UserValidation } from "@/schemas/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateUserFn } from "@/api/user";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthUserStore } from "@/stores/auth";
import { UserResponse, UserUpdateRequest } from "@/types/user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function DialogFormEditProfile({ data }: { data: UserResponse }) {
  const { authUser } = useAuthUserStore();
  const userId = authUser?.data.user.id;
  const [open, setOpen] = useState(false);
  const [fileKey, setFileKey] = useState<{
    fileKeyPhotoProfile?: number;
    fileKeyBanner?: number;
  }>();
  const [imageFile, setImageFile] = useState<{
    photoProfile?: string;
    banner?: string;
  }>({
    banner: data.banner,
    photoProfile: data.photoProfile,
  });

  const form = useForm<UpdateUserDTO>({
    resolver: zodResolver(UserValidation.UPDATE_USER),
  });

  const {
    reset,
    formState: { isSubmitSuccessful, errors },
    handleSubmit,
    setValue,
  } = form;

  const {
    mutate: updateUser,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (updatePayload: UserUpdateRequest) =>
      updateUserFn(updatePayload),
    onSuccess: () => {
      toast.success("You Successfully edited profile", {
        position: "top-right",
      });
    },
  });

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    reset();
    setFileKey({ fileKeyPhotoProfile: Date.now(), fileKeyBanner: Date.now() });
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<UpdateUserDTO> = (values: UpdateUserDTO) => {
    const payload = {
      ...values,
      id: userId!,
    };
    updateUser(payload);
    setOpen(false);
  };

  useEffect(() => {
    if (!data) return;
    setValue("name", data!.name);
    setValue("username", data!.username);
    setValue("bio", data!.bio);
  }, [data, setValue, isSuccess]);

  useEffect(() => {
    return () => {
      if (imageFile?.photoProfile) {
        URL.revokeObjectURL(imageFile.photoProfile);
      }
      if (imageFile?.banner) {
        URL.revokeObjectURL(imageFile.banner);
      }
    };
  }, [imageFile]);

  useEffect(() => {
    if (!data) return;
    setImageFile({ photoProfile: data.photoProfile, banner: data.banner });
  }, [data]);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            id="button"
            className="px-4 py-2 flex-1 w-full text-sm font-bold rounded-full border-1 border-[#FFFFFF] cursor-pointer"
          >
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed lg:inset-x-190 lg:inset-y-90 md:inset-x-115 md:inset-y-90 flex items-center justify-center object-center size-150 bg-[#1d1d1d] text-[#e8e8e8] border-none rounded-2xl pt-10 px-5 gap-5 focus:outline-none focus:border-none w-full">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
              encType="multipart/form-data"
            >
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
              <img
                src={
                  imageFile?.banner ? imageFile.banner : "default-banner.jpg"
                }
                alt=""
                className="rounded-lg h-30 w-full"
              />
              <FormField
                name="banner"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="banner"
                      className="absolute inset-x-5 h-[20%] w-[92%] inset-y-30 z-20 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-200"
                    >
                      <div className="cursor-pointer">
                        <FaRegEdit className="text-2xl inset-y-20 inset-x-60 z-30 text-[#fff]" />
                      </div>
                    </FormLabel>
                    <FormControl>
                      <input
                        id="banner"
                        key={fileKey?.fileKeyBanner}
                        type="file"
                        ref={field.ref}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          field.onChange(file);
                          const previewImage = URL.createObjectURL(file);
                          setImageFile((prev) => ({
                            ...prev,
                            banner: previewImage,
                          }));
                        }}
                        className="hidden"
                        accept="image/*"
                      />
                    </FormControl>
                    {errors.banner && (
                      <p className="text-sm text-red-500">
                        {errors.banner.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="photoProfile"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="m-0 p-0 w-0" htmlFor="photoProfile">
                      <div className="cursor-pointer z-40">
                        <FaRegEdit className="text-2xl absolute inset-y-57 inset-x-18 z-10 text-[#fff]" />
                        <Avatar className="w-20 h-20 ms-6 -mt-19 border-4 border-[#1d1d1d]">
                          <AvatarImage
                            src={
                              imageFile?.photoProfile
                                ? imageFile.photoProfile
                                : "dafault-profile-picture.jpg."
                            }
                          />
                        </Avatar>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <input
                        id="photoProfile"
                        key={fileKey?.fileKeyPhotoProfile}
                        type="file"
                        ref={field.ref}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          field.onChange(file);
                          const previewImage = URL.createObjectURL(file);
                          setImageFile((prev) => ({
                            ...prev,
                            photoProfile: previewImage,
                          }));
                        }}
                        className="hidden"
                        accept="image/*"
                      />
                    </FormControl>
                    {errors.photoProfile && (
                      <p className="text-sm text-red-500">
                        {errors.photoProfile.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 items-start w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          className="w-full border-1 border-[#e8e8e8]/50 rounded-sm text-[#e8e8e8] p-2"
                          defaultValue={""}
                          {...field}
                          placeholder="Name"
                          type="text"
                        />
                      </FormControl>
                      {errors.name && (
                        <p className="text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <input
                          className="w-full border-1 border-[#e8e8e8]/50 rounded-sm text-[#e8e8e8] p-2"
                          defaultValue={""}
                          {...field}
                          placeholder="Username"
                          type="text"
                        />
                      </FormControl>
                      {errors.username && (
                        <p className="text-sm text-red-500">
                          {errors.username.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <textarea
                          cols={3}
                          className="border-1 border-[#e8e8e8]/50 rounded-sm w-full text-[#e8e8e8] p-2 resize-none"
                          placeholder="Bio"
                          {...field}
                        />
                      </FormControl>
                      {errors.bio && (
                        <p className="text-sm text-red-500">
                          {errors.bio.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="border-t-1 border-[#e8e8e8]/50">
                <div className="flex justify-end items-center gap-3 w-full py-5 px-4">
                  <Button
                    className="rounded-3xl bg-[#04a41e] hover:bg-[#04a41e]/75 active:bg-[#04a41e] text-base px-5 cursor-pointer"
                    disabled={isPending}
                  >
                    Save
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

export default DialogFormEditProfile;
