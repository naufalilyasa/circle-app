import { allTweetsWithMediaByUserIdFn } from "@/api/tweet";
import { useAuthUserStore } from "@/stores/auth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import Loading from "../../-components/Other/Loading";
import React, { useCallback, useEffect, useRef } from "react";

export const Route = createFileRoute({
  component: Media,
});

function Media() {
  const { authUser } = useAuthUserStore();

  const userId = authUser?.data.user.id;

  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["getAllTweetsByUserId", userId],
      queryFn: ({ pageParam = 1 }) =>
        allTweetsWithMediaByUserIdFn({
          userId: userId!,
          pageParam,
        }),
      enabled: !!userId,
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (isLoading) return <Loading size={8} />;

  return !data ? (
    <div className="flex justify-center items-center mt-20">
      <p>No media.</p>
    </div>
  ) : (
    <div ref={containerRef} onScroll={handleScroll}>
      <article className="flex gap-5 items-start py-4 px-5">
        <div className={`grid grid-cols-3 gap-2 w-full`}>
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.data.tweetsByIdIsLike
                .filter((tweet) => tweet.imageUrl !== null)
                .map((tweet, index) => {
                  return (
                    <Link
                      to={"/detailImage/$tweetId"}
                      params={{ tweetId: tweet.id }}
                      className={`${[3].includes(index % 6) ? "col-span-2" : "col-span-1"} flex justify-center items-center`}
                      key={index}
                    >
                      <img
                        key={tweet.id}
                        src={tweet.imageUrl! ? tweet.imageUrl! : undefined}
                        alt=""
                        className="rounded-lg h-50 w-full object-cover"
                      />
                    </Link>
                  );
                })}
            </React.Fragment>
          ))}
        </div>
      </article>
      {isFetchingNextPage && (
        <div className="mt-5">
          <Loading size={8} />
        </div>
      )}
      {!hasNextPage && (
        <div className="flex p-5 border-x-1 border-t-1 border-[#3F3F3F]">
          <p>No more media.</p>
        </div>
      )}
    </div>
  );
}
