import { describe, expect, test } from "bun:test";
import { EmailSchema, PasswordSchema, NameSchema } from "./primitives";

describe("EmailSchema", () => {
  test("accepts valid email", () => {
    const result = EmailSchema.safeParse("user@example.com");
    expect(result.success).toBe(true);
  });

  test("rejects invalid email", () => {
    const result = EmailSchema.safeParse("not-an-email");
    expect(result.success).toBe(false);
  });

  test("rejects empty string", () => {
    const result = EmailSchema.safeParse("");
    expect(result.success).toBe(false);
  });
});

describe("PasswordSchema", () => {
  test("accepts password with 8 characters", () => {
    const result = PasswordSchema.safeParse("12345678");
    expect(result.success).toBe(true);
  });

  test("accepts long password", () => {
    const result = PasswordSchema.safeParse("a-very-long-password-123");
    expect(result.success).toBe(true);
  });

  test("rejects password shorter than 8 characters", () => {
    const result = PasswordSchema.safeParse("short");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("8");
    }
  });
});

describe("NameSchema", () => {
  test("accepts valid name", () => {
    const result = NameSchema.safeParse("John Doe");
    expect(result.success).toBe(true);
  });

  test("rejects empty name", () => {
    const result = NameSchema.safeParse("");
    expect(result.success).toBe(false);
  });

  test("rejects name exceeding 100 characters", () => {
    const result = NameSchema.safeParse("a".repeat(101));
    expect(result.success).toBe(false);
  });

  test("accepts name at 100 characters", () => {
    const result = NameSchema.safeParse("a".repeat(100));
    expect(result.success).toBe(true);
  });
});
