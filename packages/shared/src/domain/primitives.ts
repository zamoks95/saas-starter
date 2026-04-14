import { z } from "zod";

export const EmailSchema = z.string().email("Invalid email address");

export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const NameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be at most 100 characters");

export type Email = z.infer<typeof EmailSchema>;
export type Password = z.infer<typeof PasswordSchema>;
export type Name = z.infer<typeof NameSchema>;
