import { describe, expect, test } from "bun:test";
import { HealthResponseSchema } from "./health";

describe("HealthResponseSchema", () => {
  test("validates a healthy response", () => {
    const result = HealthResponseSchema.safeParse({
      status: "healthy",
      timestamp: new Date().toISOString(),
    });
    expect(result.success).toBe(true);
  });

  test("rejects invalid status", () => {
    const result = HealthResponseSchema.safeParse({
      status: "invalid",
      timestamp: new Date().toISOString(),
    });
    expect(result.success).toBe(false);
  });

  test("rejects missing timestamp", () => {
    const result = HealthResponseSchema.safeParse({
      status: "healthy",
    });
    expect(result.success).toBe(false);
  });
});
