import { Elysia } from "elysia";
import type { HealthResponse } from "@repo/shared";

export const healthRoutes = new Elysia().get("/health", (): HealthResponse => ({
  status: "healthy",
  timestamp: new Date().toISOString(),
}));
