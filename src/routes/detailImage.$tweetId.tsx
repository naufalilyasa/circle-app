import { tweetByIdFn } from "@/api/tweet";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { defaultDataDetailTweet } from "@/defaultData";
import useCreateReply from "@/hooks/useCreateReply";
import useLikeUnlikeReply from "@/hooks/useLikeUnlikeReply";
import useLikeUnlikeTweet from "@/hooks/useLikeUnlikeTweet";
import { useAuthUserStore } from "@/stores/auth";
import {
  dateCreatedFromNow,
  formatCalendarDate,
  formatDateToHour,
} from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import {
  TbHeart,
  TbHeartFilled,
  TbMessage2,
  TbPhotoPlus,
} from "react-icons/tb";
import Loading from "./_privateLayout/-components/Other/Loading";
import { toast } from "react-toastify";

export const Route = createFileRoute({
  component: DetailImagePage,
});

function DetailImagePage() {
  const [fileKey, setFileKey] = useState(Date.now());
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isImageFull, setIsImageFull] = useState<boolean>(false);
  const { authUser } = useAuthUserStore();
  const userId = authUser?.data.user.id;
  const router = useRouter();
  const params = useParams({ from: "/detailImage/$tweetId" });
  const tweetId = params.tweetId;

  const { data, isFetching } = useQuery({
    queryKey: ["tweetById", tweetId],
    queryFn: () => tweetByIdFn(tweetId),
    enabled: !!tweetId,
    placeholderData: defaultDataDetailTweet,
  });

  const {
    isLoadingLikeTweet,
    isLoadingUnlikeTweet,
    onClickLikeTweetHandler,
    onClickUnlikeTweetHandler,
  } = useLikeUnlikeTweet([["tweetById"]]);

  const {
    form,
    formState: { isSubmitSuccessful, errors },
    handleSubmit,
    isPendingCreateReply,
    reset,
    onSubmitCreateReply,
  } = useCreateReply({
    data: {
      authorId: data?.authorId,
      id: data?.id,
    },
    queryKeys: [["tweetById"]],
  });

  const {
    isLoadingLikeReply,
    isLoadingUnlikeReply,
    onClickLikeReplyHandler,
    onClickUnlikeReplyHandler,
  } = useLikeUnlikeReply([["tweetById"]]);

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

  if (errors.content) {
    toast.error(errors.content.message, {
      position: "top-right",
      theme: "dark",
    });
  }

  return (
    <section className="flex lg:flex-row max-lg:flex-col bg-[#1d1d1d] min-h-svh max-w-screen overflow-hidden overflow-x-hidden font-plus-jakarta-sans text-[#fff] w-full">
      {!data ? (
        <div className="bg-[#1d1d1d]">
          <p>Tweets not found.</p>
        </div>
      ) : isFetching ? (
        <div className="mt-20 flex justify-center items-center mx-auto">
          <Loading size={8} />
        </div>
      ) : (
        <>
          <div
            className={`${isImageFull ? "lg:ms-[14%] max-lg:ms-[18%]" : ""} lg:fixed lg:w-[68%] md:w-[85%] max-md:w-[90%] container mx-auto box-border max-w-full lg:ps-5`}
          >
            <div className="z-20 mt-[0.5%] ms-[0.5%] absolute">
              <button
                onClick={() => router.history.back()}
                className="cursor-pointer"
              >
                <AiOutlineCloseCircle className="size-10 text-gray-500" />
              </button>
            </div>
            <div className="z-20 absolute mt-[0.5%] lg:ms-[95%] max-lg:ms-146">
              {isImageFull ? (
                <button
                  className="cursor-pointer active:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsImageFull(!isImageFull);
                  }}
                >
                  <IoIosArrowDropleft className="size-10 text-gray-500" />
                </button>
              ) : (
                <button
                  className="cursor-pointer active:text-white lg:block max-lg:hidden"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsImageFull(!isImageFull);
                  }}
                >
                  <IoIosArrowDropright className="size-10 text-gray-500" />
                </button>
              )}
            </div>
            <div className="z-10 lg:w-full max-lg:w-[100%] flex items-center">
              <img
                src={data?.imageUrl ? data?.imageUrl : undefined}
                alt=""
                className="lg:object-contain max-lg:object-cover"
              />
            </div>
          </div>
          <div
            className={`${isImageFull ? "lg:hidden" : "lg:w-[32%] lg:ms-[68%] md:w-[85%] max-md:w-[90%]"} lg:px-5 max-lg:max-lg:mx-auto container box-border max-w-full`}
          >
            <div className="grid grid-cols-1 border-collapse w-full">
              <div className="flex flex-col pt-10 pb-2 px-5 border-1 border-[#3f3f3f] gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={
                          data?.author.photoProfile
                            ? data?.author.photoProfile
                            : "default-profile-picture.png"
                        }
                      />
                    </Avatar>
                    <div className="flex text-sm gap-1">
                      <p className="font-bold">{data?.author.name}</p>
                      <p className="text-[#909090] font-medium">
                        @{data?.author.username}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">{data?.content}</p>
                  </div>
                  <div>
                    <div className="flex gap-1 text-[#909090] text-sm break-all">
                      <span className="">
                        {formatDateToHour(data?.createdAt)}
                      </span>
                      <span className="text-[#909090]">•</span>
                      <span className="text-[#909090]">
                        {formatCalendarDate(data?.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 text-[#909090]">
                    <div className="flex gap-2 py-1 items-center">
                      {data?.isLike ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClickUnlikeTweetHandler(data.id);
                          }}
                          disabled={isLoadingUnlikeTweet}
                          className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 hover:drop-shadow-sm active:scale-95"
                        >
                          <TbHeartFilled className="w-6 h-6 fill-[#D71913] stroke-[#D71913]" />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClickLikeTweetHandler({
                              tweetId: data!.id,
                              userId: userId!,
                            });
                          }}
                          disabled={isLoadingLikeTweet}
                          className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 hover:drop-shadow-sm active:scale-95"
                        >
                          <TbHeart className="w-6 h-6" />
                        </button>
                      )}
                      <span>
                        {data?._count.likes ? data?._count.likes : "0"}
                      </span>
                    </div>
                    <div className="flex gap-2 py-1 items-center">
                      <button className="text-2xl">
                        <TbMessage2 className="w-6 h-6" />
                      </button>
                      <span>
                        {data?._count.replies ? data?._count.replies : "0"}
                      </span>
                      <span>Replies</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-5 border-2 border-[#2c2c2c] gap-8">
                <div className="flex space-x-5">
                  <div className="flex gap-5 text-2xl items-center">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={
                          authUser?.data.user.photoProfile
                            ? authUser?.data.user.photoProfile
                            : "default-photo-profile.png"
                        }
                      />
                    </Avatar>
                  </div>
                  <Form {...form}>
                    <form
                      onSubmit={handleSubmit(onSubmitCreateReply)}
                      className="flex justify-between items-center w-full"
                    >
                      <div className="flex flex-col space-y-4">
                        <FormField
                          control={form.control}
                          defaultValue=""
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <textarea
                                  className="text-sm font-medium placeholder:text-[#909090] placeholder:text-sm w-full resize-none focus:outline-none overflow-hidden"
                                  rows={2}
                                  placeholder="Post your reply"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex items-center gap-3">
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
                                    const previewImage =
                                      URL.createObjectURL(file);
                                    setImageFile(previewImage);
                                  }}
                                  className="hidden"
                                  accept="image/*"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          disabled={isPendingCreateReply}
                          className="rounded-full bg-[#005E0E] hover:bg-[#04a41e]/75 hover:text-[#fff] active:bg-[#04a41e] text-sm px-4 py-2 text-[#909090] cursor-pointer"
                        >
                          Reply
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
                <div className="ps-5 pb-5">
                  {imageFile ? (
                    <div>
                      <IoMdCloseCircleOutline
                        className="absolute size-10 inset-x-48 z-10 text-gray-600 hover:text-gray-400 hover:cursor-pointer"
                        onClick={() => {
                          setImageFile(null);
                          setFileKey(Date.now());
                        }}
                      />
                      <img src={imageFile} className="size-48 rounded-lg" />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {!data?.replies.length ? (
                <div className="p-5">
                  <div>No comments.</div>
                </div>
              ) : (
                data?.replies.map((reply) => {
                  return (
                    <div
                      className="flex flex-col py-5 px-5 border-2 border-[#2c2c2c] gap-8"
                      key={reply.id}
                    >
                      <article className="flex gap-5 items-start">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={
                              reply.author.photoProfile
                                ? reply.author.photoProfile
                                : "default-profile-picture.png"
                            }
                          />
                        </Avatar>
                        <div className="flex flex-col gap-2 text-sm break-all">
                          <div className="flex gap-1 font-medium">
                            <p className="font-bold">{reply.author.name}</p>

                            <span className="text-[#909090]">
                              @{reply.author.username}
                            </span>
                            <span className="text-[#909090]">•</span>
                            <span className="text-[#909090]">
                              {dateCreatedFromNow(reply.createdAt)}
                            </span>
                          </div>
                          <p>{reply.content}</p>
                          <img
                            src={reply.imageUrl ? reply.imageUrl : "/"}
                            alt=""
                            className="rounded-lg w-[70%]"
                          />
                          <div className="flex gap-3 text-[#909090] font-normal">
                            <div className="flex items-center gap-2 py-1">
                              {reply.isLike ? (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onClickUnlikeReplyHandler(reply.id);
                                  }}
                                  disabled={isLoadingUnlikeReply}
                                  className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 hover:drop-shadow-sm active:scale-95"
                                >
                                  <TbHeartFilled className="w-6 h-6 fill-[#D71913] stroke-[#D71913]" />
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onClickLikeReplyHandler({
                                      tweetId: reply.id,
                                      userId: userId!,
                                    });
                                  }}
                                  disabled={isLoadingLikeReply}
                                  className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 hover:drop-shadow-sm active:scale-95"
                                >
                                  <TbHeart className="w-6 h-6" />
                                </button>
                              )}
                              <span>
                                {reply._count.likes ? reply._count.likes : "0"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
