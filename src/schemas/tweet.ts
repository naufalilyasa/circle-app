import { z } from "zod";

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  "image/gif",
  "image/webp",
];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const imageSchema = z
  .instanceof(File, { message: "This is not file." })
  .optional()
  .refine(
    (file) => {
      if (!file) return true;
      return ALLOWED_IMAGE_TYPES.includes(file.type);
    },
    { message: "Invalid image file type", path: ["image"] }
  )
  .refine(
    (file) => {
      if (!file) return true;
      return file.size <= MAX_IMAGE_SIZE_BYTES;
    },
    { message: "Max 5 mb size image.", path: ["image"] }
  );

export class TweetValidation {
  static readonly CREATE_TWEET = z
    .object({
      content: z.string().trim().min(1).max(1000).optional(),
      image: imageSchema,
    })
    .refine((data) => Boolean(data.content?.trim()) || Boolean(data.image), {
      message: "Either content or image must be provided",
      path: ["content"],
    });

  static readonly UPDATE_TWEET = z
    .object({
      content: z.string().trim().min(1).max(1000),
      image: imageSchema,
    })
    .refine((data) => Boolean(data.content?.trim()) || Boolean(data.image), {
      message: "Either content or image must be provided",
      path: ["content"],
    });
}

export type CreateTweetDTO = z.infer<typeof TweetValidation.CREATE_TWEET>;
export type UpdateTweetDTO = z.infer<typeof TweetValidation.UPDATE_TWEET>;
