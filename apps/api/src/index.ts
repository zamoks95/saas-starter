import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { healthRoutes } from "./infrastructure/http/routes/health.routes";
import { authRoutes } from "./infrastructure/http/routes/auth.routes";
import { meRoutes } from "./infrastructure/http/routes/me.routes";
import { errorPlugin } from "./infrastructure/plugins/error.plugin";

const port = process.env.PORT ?? 3000;

const app = new Elysia()
  .use(cors())
  .use(errorPlugin)
  .use(healthRoutes)
  .use(authRoutes)
  .use(meRoutes)
  .listen(port);

console.log(`API server running at http://localhost:${port}`);

export type App = typeof app;
