import { z } from "zod";

export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.string().datetime(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const UpdateProfileRequestSchema = z
  .object({
    name: z.string().min(1).optional(),
    image: z.string().url().optional(),
  })
  .refine((data) => data.name !== undefined || data.image !== undefined, {
    message: "At least one field (name or image) must be provided",
  });

export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;

export const ChangePasswordRequestSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export type ChangePasswordRequest = z.infer<
  typeof ChangePasswordRequestSchema
>;
