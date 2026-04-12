import { Elysia, type Context } from "elysia";
import { auth } from "../../auth/auth";

const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];

const betterAuthView = (context: Context) => {
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  }
  context.set.status = 405;
  return "Method Not Allowed";
};

export const authRoutes = new Elysia().all("/api/auth/*", betterAuthView);
