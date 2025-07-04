import { z } from "zod";

export class UserValidation {
  static readonly UPDATE_USER = z.object({
    name: z.string().trim().min(1).max(32),
    username: z.string().trim().min(1).max(20),
    bio: z.string().trim().min(1).max(1000),
    photoProfile: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || file!.size <= 5 * 1024 * 1024,
        "Max 5 mb size image"
      )
      .refine(
        (file) =>
          !file ||
          [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/svg+xml",
            "image/gif",
          ].includes(file!.type),
        { message: "Invalid image file type" }
      ),
    banner: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || file!.size <= 5 * 1024 * 1024,
        "Max 5 mb size image"
      )
      .refine(
        (file) =>
          !file ||
          [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/svg+xml",
            "image/gif",
          ].includes(file!.type),
        { message: "Invalid image file type" }
      ),
  });
}

export type UpdateUserDTO = z.infer<typeof UserValidation.UPDATE_USER>;
