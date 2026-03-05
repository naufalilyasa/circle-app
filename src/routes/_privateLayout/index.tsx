import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TbHeart } from "react-icons/tb";
import { TbHeartFilled } from "react-icons/tb";
import { TbMessage2 } from "react-icons/tb";
import { Link } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { allTweetsFn } from "@/api/tweet";
import { useAuthUserStore } from "@/stores/auth";
import { dateCreatedFromNow } from "@/utils/formatDate";
import Header from "./-components/Home/Header";
import FormCreateTweet from "./-components/Home/FormCreateTweet";
import ThreeDotsPopover from "./-components/Other/ThreeDotsPopover";
import useLikeUnlikeTweet from "@/hooks/useLikeUnlikeTweet";
import Loading from "./-components/Other/Loading";
import React, { useCallback, useEffect, useRef } from "react";

export const Route = createFileRoute({
  component: HomePage,
});

function HomePage() {
  const { authUser } = useAuthUserStore();
  const userId = authUser?.data.user.id;

  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["getAllTweetsAndPaginated"],
      queryFn: allTweetsFn,
      initialPageParam: 1,
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
  }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

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
  } = useLikeUnlikeTweet([["getAllTweetsAndPaginated"]]);

  if (isLoading) {
    return (
      <div className="mt-50">
        <Loading size={10} />
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full max-w-full"
    >
      <div className="grid grid-cols-1 border-collapse">
        {/* Home header */}
        <Header />
        {/* Form post tweet */}
        <FormCreateTweet />

        {/* Tweets List */}
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page?.data?.tweetsIsLike?.map((tweet) => (
              <article
                className="flex gap-4 md:px-4 px-4 py-4 items-start border-b-1 border-[#2c2c2c] md:w-full max-md:w-full"
                key={tweet.id}
              >
                <Link
                  to={
                    authUser?.data.user.id === tweet.authorId
                      ? "/profile"
                      : "/profile/$profileId"
                  }
                  params={{ profileId: tweet.author.id }}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        tweet.author.photoProfile ===
                        "https://github.com/shadcn.png"
                          ? "https://github.com/shadcn.png"
                          : tweet.author.photoProfile
                      }
                    />
                  </Avatar>
                </Link>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex max-md:flex-wrap gap-x-1 text-sm">
                      <Link
                        to={
                          authUser?.data.user.id === tweet.authorId
                            ? "/profile"
                            : "/profile/$profileId"
                        }
                        params={{ profileId: tweet.author.id }}
                        className="flex max-md:gap-1 max-md:max-w-full text-[#909090] font-medium hover:text-white hover:cursor-pointer"
                      >
                        <span className="font-bold max-md:truncate max-md:max-w-[120px]">
                          {tweet.author.name}
                        </span>
                        <span className="max-md:text-ellipsis max-md:max-w-[120px]">
                          @{tweet.author.username}
                        </span>
                      </Link>
                      <span className="text-[#909090] font-medium">•</span>
                      <span className="text-[#909090] font-medium max-md:truncate">
                        {dateCreatedFromNow(tweet.createdAt)}
                      </span>
                    </div>
                    <div className="">
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
                    className="flex flex-col gap-2"
                  >
                    <span className="w-full text-sm font-normal">
                      {tweet.content}
                    </span>
                    <img
                      src={tweet.imageUrl ? tweet.imageUrl : "/"}
                      alt=""
                      className="rounded-lg w-[70%]"
                    />
                    <div className="flex gap-3 text-[#909090] text-sm font-normal">
                      <div className="flex gap-2 items-center py-1">
                        <div className="flex justify-center items-center">
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
                        </div>
                        <span>{tweet._count.likes}</span>
                      </div>
                      <div className="flex gap-2 items-center py-1">
                        <button className="flex justify-center items-center">
                          <TbMessage2 className="w-6 h-6" />
                        </button>
                        <span>{tweet._count.replies}</span>
                        <span>Replies</span>
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
          <div className="flex p-5 border-x-1 border-[#3F3F3F]">
            <p>No more tweets.</p>
          </div>
        )}
      </div>
    </section>
  );
}
