import { z } from "zod";

export class ReplyValidation {
  static readonly CREATE_REPLY = z
    .object({
      content: z.string().trim().min(1).max(1000),
      image: z
        .instanceof(File)
        .optional()
        .refine(
          (file) => {
            if (!file) return true;
            return file.size <= 5 * 1024 * 1024;
          },
          { message: "Max 5 mb size image", path: ["image"] }
        )
        .refine(
          (file) => {
            if (!file) return true;
            return [
              "image/png",
              "image/jpeg",
              "image/jpg",
              "image/svg+xml",
              "image/gif",
            ].includes(file.type);
          },
          { message: "Invalid image file type", path: ["image"] }
        ),
    })
    .refine((data) => Boolean(data.content?.trim()) || Boolean(data.image), {
      message: "Either content or image must be provided",
      path: ["content"],
    });
}

export type CreateReplyDTO = z.infer<typeof ReplyValidation.CREATE_REPLY>;
