import { describe, expect, test } from "bun:test";
import { z } from "zod";
import {
  PaginationParamsSchema,
  createPaginatedResponseSchema,
} from "./pagination";

describe("PaginationParamsSchema", () => {
  test("applies default values when no input", () => {
    const result = PaginationParamsSchema.parse({});
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
  });

  test("accepts custom page and limit", () => {
    const result = PaginationParamsSchema.parse({ page: 3, limit: 50 });
    expect(result.page).toBe(3);
    expect(result.limit).toBe(50);
  });

  test("rejects non-positive page", () => {
    const result = PaginationParamsSchema.safeParse({ page: 0 });
    expect(result.success).toBe(false);
  });

  test("rejects limit over 100", () => {
    const result = PaginationParamsSchema.safeParse({ limit: 101 });
    expect(result.success).toBe(false);
  });
});

describe("createPaginatedResponseSchema", () => {
  const ItemSchema = z.object({ id: z.string(), name: z.string() });
  const PaginatedItemSchema = createPaginatedResponseSchema(ItemSchema);

  test("validates a paginated response", () => {
    const result = PaginatedItemSchema.safeParse({
      items: [{ id: "1", name: "Item 1" }],
      total: 50,
      page: 1,
      limit: 20,
      hasMore: true,
    });
    expect(result.success).toBe(true);
  });

  test("validates empty items array", () => {
    const result = PaginatedItemSchema.safeParse({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      hasMore: false,
    });
    expect(result.success).toBe(true);
  });

  test("rejects invalid items", () => {
    const result = PaginatedItemSchema.safeParse({
      items: [{ id: "1" }],
      total: 1,
      page: 1,
      limit: 20,
      hasMore: false,
    });
    expect(result.success).toBe(false);
  });

  test("rejects missing hasMore", () => {
    const result = PaginatedItemSchema.safeParse({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
    });
    expect(result.success).toBe(false);
  });
});
