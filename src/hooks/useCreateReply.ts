import { createReplyByIdFn } from "@/api/reply";
import { CreateReplyDTO, ReplyValidation } from "@/schemas/reply";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import useInvalidateQueries from "@/hooks/useInvalidateQueries";
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
  const invalidateAll = useInvalidateQueries(props.queryKeys);
  const form = useForm<CreateReplyDTO>({
    resolver: zodResolver(ReplyValidation.CREATE_REPLY),
  });

  const { handleSubmit, formState, reset } = form;

  const { mutate: createReply, isPending: isPendingCreateReply } = useMutation({
    mutationKey: ["createReply"],
    mutationFn: createReplyByIdFn,
    onSuccess: () => {
      toast.success("Successfully replying");
      invalidateAll();
    },
    onError: (error: Error) => {
      toast.error(error.message);
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
