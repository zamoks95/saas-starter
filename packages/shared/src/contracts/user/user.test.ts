import { describe, expect, test } from "bun:test";
import {
  UserResponseSchema,
  UpdateProfileRequestSchema,
  ChangePasswordRequestSchema,
} from "./user";

describe("UserResponseSchema", () => {
  test("validates a complete user response", () => {
    const result = UserResponseSchema.safeParse({
      id: "user-1",
      name: "Test User",
      email: "test@example.com",
      emailVerified: false,
      image: null,
      createdAt: "2024-01-01T00:00:00.000Z",
    });
    expect(result.success).toBe(true);
  });

  test("rejects invalid email", () => {
    const result = UserResponseSchema.safeParse({
      id: "user-1",
      name: "Test",
      email: "not-an-email",
      emailVerified: false,
      image: null,
      createdAt: "2024-01-01T00:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });
});

describe("UpdateProfileRequestSchema", () => {
  test("accepts name only", () => {
    const result = UpdateProfileRequestSchema.safeParse({ name: "New Name" });
    expect(result.success).toBe(true);
  });

  test("accepts image only", () => {
    const result = UpdateProfileRequestSchema.safeParse({
      image: "https://example.com/avatar.png",
    });
    expect(result.success).toBe(true);
  });

  test("accepts both name and image", () => {
    const result = UpdateProfileRequestSchema.safeParse({
      name: "New Name",
      image: "https://example.com/avatar.png",
    });
    expect(result.success).toBe(true);
  });

  test("rejects empty body", () => {
    const result = UpdateProfileRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("ChangePasswordRequestSchema", () => {
  test("accepts valid password change", () => {
    const result = ChangePasswordRequestSchema.safeParse({
      currentPassword: "oldpass123",
      newPassword: "newpass123",
    });
    expect(result.success).toBe(true);
  });

  test("rejects short new password", () => {
    const result = ChangePasswordRequestSchema.safeParse({
      currentPassword: "oldpass",
      newPassword: "abc",
    });
    expect(result.success).toBe(false);
  });

  test("rejects missing current password", () => {
    const result = ChangePasswordRequestSchema.safeParse({
      newPassword: "newpass123",
    });
    expect(result.success).toBe(false);
  });
});
