import { describe, expect, test } from "bun:test";
import { ErrorResponseSchema } from "./error";

describe("ErrorResponseSchema", () => {
  test("validates error without details", () => {
    const result = ErrorResponseSchema.safeParse({
      code: "NOT_FOUND",
      message: "User not found",
    });
    expect(result.success).toBe(true);
  });

  test("validates error with details", () => {
    const result = ErrorResponseSchema.safeParse({
      code: "VALIDATION_ERROR",
      message: "Invalid input",
      details: ["name is required"],
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing code", () => {
    const result = ErrorResponseSchema.safeParse({
      message: "Something failed",
    });
    expect(result.success).toBe(false);
  });

  test("rejects missing message", () => {
    const result = ErrorResponseSchema.safeParse({
      code: "ERROR",
    });
    expect(result.success).toBe(false);
  });
});
