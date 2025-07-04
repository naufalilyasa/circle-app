import { deleteTweetFn } from "@/api/tweet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface TweetPropsType {
  id: string;
  content: string;
  imageUrl: string;
  authorId: string;
  photoProfile: string | undefined;
}

function AlertDelete({ tweetProps }: { tweetProps: TweetPropsType }) {
  const queryClient = useQueryClient();

  const { mutate: deleteTweet, isPending: isPendingDeleteTweet } = useMutation({
    mutationKey: ["deleteTweet"],
    mutationFn: deleteTweetFn,
    onSuccess: () => {
      toast.success("You successfully deleted tweet", {
        position: "top-right",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllTweets"] });
    },
    onError: (error: Error) => {
      if (Array.isArray(error.message)) {
        error.message.forEach((element) => {
          toast.error(element, { position: "top-right" });
        });
      } else {
        toast.error(error.message, {
          position: "top-right",
        });
      }
    },
  });

  const onClickDeleteTweet = (tweetId: string) => {
    deleteTweet(tweetId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className=" text-white p-2 hover:bg-[#1d1d1d] cursor-pointer rounded-md">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#1d1d1d] text-[#e8e8e8] border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            tweet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-[#1d1d1d] cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            disabled={isPendingDeleteTweet}
            onClick={() => onClickDeleteTweet(tweetProps.id)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDelete;
