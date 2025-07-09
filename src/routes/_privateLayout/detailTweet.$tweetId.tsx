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
import { TbArrowLeft } from "react-icons/tb";
import { TbPhotoPlus } from "react-icons/tb";
import { TbHeart } from "react-icons/tb";
import { TbHeartFilled } from "react-icons/tb";
import { TbMessage2 } from "react-icons/tb";
import Loading from "./-components/Other/Loading";

export const Route = createFileRoute({
  component: DetailPostPage,
});

function DetailPostPage() {
  const [fileKey, setFileKey] = useState(Date.now());
  const router = useRouter();
  const params = useParams({ from: "/_privateLayout/detailTweet/$tweetId" });
  const tweetId = params.tweetId;
  const { authUser } = useAuthUserStore();
  const userId = authUser?.data.user.id;

  const { data, isFetching } = useQuery({
    queryKey: ["tweetById", tweetId],
    queryFn: () => tweetByIdFn(tweetId),
    enabled: !!tweetId,
    placeholderData: defaultDataDetailTweet,
  });

  const {
    formState: { isSubmitSuccessful, errors },
    handleSubmit,
    isPendingCreateReply,
    onSubmitCreateReply,
    reset,
    form,
  } = useCreateReply({
    data: {
      authorId: data?.authorId,
      id: data?.id,
    },
    queryKeys: [["tweetById"]],
  });

  useEffect(() => {
    if (isSubmitSuccessful) return;
    reset();
    setFileKey(Date.now());
  }, [isSubmitSuccessful, reset]);

  const [imageFile, setImageFile] = useState<string>();
  useEffect(() => {
    return () => {
      if (imageFile) {
        URL.revokeObjectURL(imageFile);
      }
    };
  }, [imageFile]);

  const {
    isLoadingLikeTweet,
    isLoadingUnlikeTweet,
    onClickLikeTweetHandler,
    onClickUnlikeTweetHandler,
  } = useLikeUnlikeTweet([["tweetById"]]);

  const {
    isLoadingLikeReply,
    isLoadingUnlikeReply,
    onClickLikeReplyHandler,
    onClickUnlikeReplyHandler,
  } = useLikeUnlikeReply();

  if (isFetching)
    return (
      <div className="mt-20 flex justify-center items-center mx-auto">
        <Loading size={8} />
      </div>
    );

  return (
    <section>
      <div className="grid grid-cols-1 border-collapse">
        <div className="flex flex-col pt-10 pb-2 px-5 border-1 border-[#3f3f3f] gap-8">
          <div className="flex items-center text-3xl gap-[10px] opacity-80">
            <button
              onClick={() => router.history.back()}
              className="cursor-pointer"
            >
              <TbArrowLeft className="w-7 h-7 stroke-1" />
            </button>
            <h1 className="font-bold text-3xl">Status</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={
                    data?.author.photoProfile
                      ? data?.author.photoProfile
                      : "default-photo-profile.png"
                  }
                />
              </Avatar>
              <div className="flex flex-col text-sm">
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
              <div className="flex gap-1 text-[#909090] text-sm">
                <span className="">{formatDateToHour(data?.createdAt)}</span>
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
                <span>{data?._count.likes}</span>
                <TbMessage2 className="w-6 h-6" />
                <span>{data?._count.replies}</span>
                <span>Replies</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-5 border-2 border-[#2c2c2c] gap-8">
          <div className="flex space-x-5">
            <div className="flex gap-5 text-2xl items-center">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </div>
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmitCreateReply)}
                className="flex justify-between items-center w-full"
                encType="multipart/form-data"
              >
                <div className="flex flex-col space-y-4 w-full">
                  <FormField
                    control={form.control}
                    defaultValue=""
                    name="content"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <textarea
                            id=""
                            className="placeholder:text-xl text-normal font-medium placeholder:text-[#909090] w-full h-8 resize-none focus:outline-none overflow-hidden"
                            rows={1}
                            placeholder="What is happening?!"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-500">
                      {errors.content.message}
                    </p>
                  )}
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
                    disabled={isPendingCreateReply}
                    className={`${isPendingCreateReply ? "cursor-not-allowed" : ""}rounded-full bg-[#005E0E] hover:bg-[#04a41e]/75 hover:text-[#fff] active:bg-[#04a41e] text-sm px-4 py-2 text-[#909090] cursor-pointer`}
                  >
                    Reply
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          {imageFile ? (
            <img src={imageFile} className="size-48 rounded-lg" />
          ) : (
            ""
          )}
        </div>
        {data?.replies.map((reply) => (
          <div className="flex flex-col py-5 px-5 border-2 border-[#2c2c2c] gap-8">
            <article className="flex gap-5 items-start">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-col gap-2 text-sm w-full">
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
                    <span>{reply._count.likes}</span>
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
        ))}
      </div>
    </section>
  );
}
