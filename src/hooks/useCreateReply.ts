import { createReplyByIdFn } from "@/api/reply";
import { CreateReplyDTO, ReplyValidation } from "@/schemas/reply";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type PropsCreateReply = {
  data: {
    authorId: string | undefined;
    id: string | undefined;
  };
  queryKeys?: string[][];
};

function useCreateReply(props: PropsCreateReply) {
  const queryClient = useQueryClient();
  const form = useForm<CreateReplyDTO>({
    resolver: zodResolver(ReplyValidation.CREATE_REPLY),
  });

  const invalidateAll = () => {
    if (!props.queryKeys) return;
    props.queryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });
  };

  const { handleSubmit, formState, reset } = form;

  const { mutate: createReply, isPending: isPendingCreateReply } = useMutation({
    mutationKey: ["createReply"],
    mutationFn: createReplyByIdFn,
    onSuccess: () => {
      toast.success("Successfully replying", {
        position: "top-right",
      });
      invalidateAll();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (Array.isArray(error.message)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error.message.forEach((element: any) => {
          toast.error(element, { position: "top-right" });
        });
      } else {
        toast.error(error.message, {
          position: "top-right",
        });
      }
    },
  });

  const onSubmitCreateReply: SubmitHandler<CreateReplyDTO> = (
    values: CreateReplyDTO
  ) => {
    const newData = {
      ...values,
      authorId: props.data.authorId!,
      tweetId: props.data.id!,
    };
    createReply(newData);
  };

  return {
    handleSubmit,
    formState,
    reset,
    isPendingCreateReply,
    onSubmitCreateReply,
    form,
  };
}

export default useCreateReply;
