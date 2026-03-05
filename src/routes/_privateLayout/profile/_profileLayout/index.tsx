import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TbHeart, TbHeartFilled, TbMessage2 } from "react-icons/tb";
import { useInfiniteQuery } from "@tanstack/react-query";
import { allTweetsByUserIdFn } from "@/api/tweet";
import { dateCreatedFromNow } from "@/utils/formatDate";
import { Link } from "@tanstack/react-router";
import { useAuthUserStore } from "@/stores/auth";
import Loading from "../../-components/Other/Loading";
import React, { useCallback, useEffect, useRef } from "react";
import useLikeUnlikeTweet from "@/hooks/useLikeUnlikeTweet";
import ThreeDotsPopover from "../../-components/Other/ThreeDotsPopover";

export const Route = createFileRoute({
  component: AllPosts,
});

function AllPosts() {
  const { authUser } = useAuthUserStore();
  const userId = authUser?.data.user.id;

  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["getAllTweetsByUserId", userId],
      queryFn: ({ pageParam = 1 }) =>
        allTweetsByUserIdFn({ userId: userId!, pageParam }),
      initialPageParam: 1,
      // initialData: defaultTweets,
      enabled: !!userId,
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.data.hasNext ? pages.length + 1 : undefined;
      },
    });

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || isLoading || isFetchingNextPage || !hasNextPage) return;
    const isAtBottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 200;

    if (isAtBottom) {
      fetchNextPage();
    }
  }, [fetchNextPage, isLoading, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const {
    isLoadingLikeTweet,
    isLoadingUnlikeTweet,
    onClickLikeTweetHandler,
    onClickUnlikeTweetHandler,
  } = useLikeUnlikeTweet([["getAllTweetsByUserId"]]);

  if (isLoading) return <Loading size={8} />;

  return !data ? (
    <div className="flex justify-center items-center mt-20">
      <p>No tweets.</p>
    </div>
  ) : (
    <div ref={containerRef} onScroll={handleScroll}>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.data.tweetsByIdIsLike?.map((tweet, index) => (
            <article className="flex gap-5 items-start py-4 px-5" key={index}>
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={
                    tweet.author.photoProfile
                      ? tweet.author.photoProfile
                      : "https://github.com/shadcn.png"
                  }
                />
              </Avatar>
              <div className="flex flex-col gap-2 text-sm w-full">
                <div className="flex justify-between items-center">
                  <div className="flex max-md:flex-wrap gap-1">
                    <p className="font-bold">{tweet.author.name}</p>
                    <span className="text-[#909090] ">
                      @{tweet.author.username}
                    </span>
                    <span className="text-[#909090]">•</span>
                    <span className="text-[#909090]">
                      {dateCreatedFromNow(tweet.createdAt)}
                    </span>
                  </div>
                  <div>
                    <ThreeDotsPopover
                      tweetProps={{
                        id: tweet.id,
                        authorId: tweet.authorId,
                        content: tweet.content,
                        imageUrl: tweet.imageUrl,
                        photoProfile: authUser?.data.user.photoProfile,
                        isFollowedByCurrentUser:
                          tweet.author.isFollowedByCurrentUser,
                      }}
                    />
                  </div>
                </div>
                <Link
                  to={
                    tweet.imageUrl
                      ? `/detailImage/$tweetId`
                      : `/detailTweet/$tweetId`
                  }
                  params={{ tweetId: tweet.id }}
                  key={tweet.id}
                  className="flex flex-col gap-1"
                >
                  <p>{tweet.content}</p>
                  <img
                    src={tweet.imageUrl ? tweet.imageUrl : "/"}
                    alt=""
                    className="rounded-md w-[70%] min-w-50 max-w-100"
                  />
                  <div className="flex gap-3 text-[#909090]">
                    <div className="flex gap-2 py-1 items-center">
                      {tweet.isLike ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClickUnlikeTweetHandler(tweet.id);
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
                              tweetId: tweet.id,
                              userId: userId!,
                            });
                          }}
                          disabled={isLoadingLikeTweet}
                          className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 hover:drop-shadow-sm active:scale-95"
                        >
                          <TbHeart className="w-6 h-6" />
                        </button>
                      )}
                      <span>{tweet._count.likes}</span>
                    </div>
                    <div className="flex gap-2 py-1 items-center">
                      <button className="">
                        <TbMessage2 className="size-6" />
                      </button>
                      <span>{tweet._count.replies} Replies</span>
                    </div>
                  </div>
                </Link>
              </div>
            </article>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && (
        <div className="mt-5">
          <Loading size={8} />
        </div>
      )}
      {!hasNextPage && (
        <div className="flex p-5 border-x-1 border-t-1 border-[#3F3F3F]">
          <p>No more tweets.</p>
        </div>
      )}
    </div>
  );
}
