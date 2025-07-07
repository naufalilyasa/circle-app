import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import FormEditTweet from "../Home/FormEditTweet";
import { useAuthUserStore } from "@/stores/auth";
import useFollowUnfollow from "@/hooks/useFollowUnfollow";
import AlertDelete from "../Home/AlertDelete";

interface TweetPropsType {
  id: string;
  content: string;
  imageUrl: string;
  authorId: string;
  photoProfile: string | undefined;
  isFollowedByCurrentUser: boolean;
}

function ThreeDotsPopover({ tweetProps }: { tweetProps: TweetPropsType }) {
  const { authUser } = useAuthUserStore();
  const userId = authUser?.data.user.id;

  const {
    isLoadingFollow,
    isLoadingUnfollow,
    onClickFollowHandler,
    onClickUnfollowHandler,
  } = useFollowUnfollow([
    [
      "getAllUsers",
      "getAllTweetsAndPaginated",
      "getUserById",
      "getSuggestedFollowers",
    ],
  ]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="rounded-full p-2 cursor-pointer hover:bg-[#262626] active:bg-[#262626]">
            <BsThreeDotsVertical />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-30 border-[#3a3a3a] bg-[#262626] p-2!">
          <div className="flex flex-col gap-1 text-sm">
            {userId === tweetProps.authorId ? (
              <>
                <FormEditTweet tweetProps={tweetProps} />
                <AlertDelete tweetProps={tweetProps} />
              </>
            ) : tweetProps.isFollowedByCurrentUser ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClickUnfollowHandler({
                    targetUserId: tweetProps.authorId,
                  });
                }}
                className=" text-white p-2 hover:bg-[#1d1d1d] cursor-pointer rounded-md"
                disabled={isLoadingUnfollow}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClickFollowHandler({
                    targetUserId: tweetProps.authorId,
                    userId: userId!,
                  });
                }}
                className=" text-white p-2 hover:bg-[#1d1d1d] cursor-pointer rounded-md"
                disabled={isLoadingFollow}
              >
                Follow
              </button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default ThreeDotsPopover;
