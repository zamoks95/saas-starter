import { describe, expect, test } from "bun:test";
import {
  SignupRequestSchema,
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
} from "./auth";

describe("SignupRequestSchema", () => {
  test("accepts valid signup data", () => {
    const result = SignupRequestSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(true);
  });

  test("rejects mismatched passwords", () => {
    const result = SignupRequestSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join("."));
      expect(paths).toContain("confirmPassword");
    }
  });

  test("rejects invalid email", () => {
    const result = SignupRequestSchema.safeParse({
      name: "Test User",
      email: "not-email",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
  });

  test("rejects short password", () => {
    const result = SignupRequestSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      password: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
  });

  test("rejects empty name", () => {
    const result = SignupRequestSchema.safeParse({
      name: "",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
  });
});

describe("ForgotPasswordRequestSchema", () => {
  test("accepts valid email", () => {
    const result = ForgotPasswordRequestSchema.safeParse({
      email: "test@example.com",
    });
    expect(result.success).toBe(true);
  });

  test("rejects invalid email", () => {
    const result = ForgotPasswordRequestSchema.safeParse({
      email: "not-email",
    });
    expect(result.success).toBe(false);
  });
});

describe("ResetPasswordRequestSchema", () => {
  test("accepts valid reset data", () => {
    const result = ResetPasswordRequestSchema.safeParse({
      token: "abc123",
      newPassword: "newpass123",
      confirmPassword: "newpass123",
    });
    expect(result.success).toBe(true);
  });

  test("rejects mismatched passwords", () => {
    const result = ResetPasswordRequestSchema.safeParse({
      token: "abc123",
      newPassword: "newpass123",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join("."));
      expect(paths).toContain("confirmPassword");
    }
  });

  test("rejects missing token", () => {
    const result = ResetPasswordRequestSchema.safeParse({
      newPassword: "newpass123",
      confirmPassword: "newpass123",
    });
    expect(result.success).toBe(false);
  });

  test("rejects empty token", () => {
    const result = ResetPasswordRequestSchema.safeParse({
      token: "",
      newPassword: "newpass123",
      confirmPassword: "newpass123",
    });
    expect(result.success).toBe(false);
  });

  test("rejects short password", () => {
    const result = ResetPasswordRequestSchema.safeParse({
      token: "abc123",
      newPassword: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
  });
});
