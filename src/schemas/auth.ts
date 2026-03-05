import { z } from "zod";

export class AuthUserValidation {
  static readonly LOGIN = z.object({
    email: z.string().email().min(1).max(30),
    password: z
      .string()
      .trim()
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  });

  static readonly REGISTER = z
    .object({
      name: z.string().trim().min(1).max(30),
      username: z.string().trim().min(1).max(20),
      email: z.string().email().trim().min(1).max(30),
      password: z
        .string()
        .trim()
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
      passwordConfirm: z
        .string()
        .trim()
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Password do not match",
      path: ["passwordConfirm"],
    });

  static readonly EMAIL_VERIFICATION = z.object({
    verificationCode: z.string().min(1, "Email verification code is required"),
  });

  static readonly FORGOT_PASSWORD = z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email must contain at least 1 character(s)")
      .email("Email address is invalid"),
  });

  static readonly RESET_PASSWORD = z
    .object({
      password: z
        .string()
        .trim()
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
      passwordConfirm: z
        .string()
        .trim()
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Password do not match",
      path: ["passwordConfirm"],
    });
}

export type LoginUserDTO = z.infer<typeof AuthUserValidation.LOGIN>;
export type RegisterUserDTO = z.infer<typeof AuthUserValidation.REGISTER>;
export type VerificationCodeDTO = z.infer<
  typeof AuthUserValidation.EMAIL_VERIFICATION
>;
export type ForgotPasswordDTO = z.infer<
  typeof AuthUserValidation.FORGOT_PASSWORD
>;
export type ResetPasswordDTO = z.infer<
  typeof AuthUserValidation.RESET_PASSWORD
>;
