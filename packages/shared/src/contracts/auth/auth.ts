import { z } from "zod";
import { EmailSchema, NameSchema, PasswordSchema } from "../../domain/primitives";

export const SignupRequestSchema = z
  .object({
    name: NameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupRequest = z.infer<typeof SignupRequestSchema>;

export const ForgotPasswordRequestSchema = z.object({
  email: EmailSchema,
});

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;

export const ResetPasswordRequestSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    newPassword: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
