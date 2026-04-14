import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { diPlugin } from "./infrastructure/plugins/di.plugin";
import { healthRoutes } from "./infrastructure/http/routes/health.routes";
import { authRoutes } from "./infrastructure/http/routes/auth.routes";

const port = process.env.PORT ?? 3000;

const app = new Elysia()
  .use(cors())
  .use(diPlugin)
  .use(healthRoutes)
  .use(authRoutes)
  .listen(port);

console.log(`API server running at http://localhost:${port}`);

export type App = typeof app;
