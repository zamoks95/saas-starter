import { describe, expect, test } from "bun:test";
import { Elysia } from "elysia";
import { healthRoutes } from "./health.routes";

describe("GET /health", () => {
  const app = new Elysia().use(healthRoutes);

  test("returns healthy status", async () => {
    const response = await app
      .handle(new Request("http://localhost/health"))
      .then((res) => res.json());

    expect(response.status).toBe("healthy");
    expect(response.timestamp).toBeDefined();
  });
});
