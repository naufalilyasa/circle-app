import { z } from "zod";

export class TweetValidation {
  static readonly CREATE_TWEET = z
    .object({
      content: z.string().trim().min(1).max(1000).optional(),
      image: z
        .instanceof(File, { message: "This is not file." })
        .optional()
        .refine((file) => {
          if (!file) return true;
          return (
            [
              "image/png",
              "image/jpeg",
              "image/jpg",
              "image/svg+xml",
              "image/gif",
              "image/webp",
            ].includes(file!.type),
            { message: "Invalid image file type" }
          );
        })
        .refine((file) => {
          if (!file) return true;
          return file!.size <= 5 * 1024 * 1024;
        }, "Max 5 mb size image."),
    })
    .refine((data) => Boolean(data.content?.trim()) || Boolean(data.image), {
      message: "Either content or image must be provided",
      path: ["content"],
    });

  static readonly UPDATE_TWEET = z
    .object({
      content: z.string().trim().min(1).max(1000),
      image: z
        .instanceof(File)
        .optional()
        .refine(
          (file) => {
            if (!file) return true;
            return [
              "image/png",
              "image/jpeg",
              "image/jpg",
              "image/svg+xml",
              "image/gif",
              "image/webp",
            ].includes(file!.type);
          },
          { message: "Invalid image file type", path: ["image"] }
        )
        .refine(
          (file) => {
            if (!file) return true;
            return file!.size <= 5 * 1024 * 1024;
          },
          {
            message: "Max 5 mb size image.",
            path: ["image"],
          }
        ),
    })
    .refine((data) => Boolean(data.content?.trim()) || Boolean(data.image), {
      message: "Either content or image must be provided",
      path: ["content"],
    });
}

export type CreateTweetDTO = z.infer<typeof TweetValidation.CREATE_TWEET>;
export type UpdateTweetDTO = z.infer<typeof TweetValidation.UPDATE_TWEET>;
