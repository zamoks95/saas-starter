import { Elysia } from "elysia";
import { authPlugin } from "./auth.plugin";

export const guardPlugin = new Elysia({ name: "guard" })
  .use(authPlugin)
  .onBeforeHandle(({ user, set }) => {
    if (!user) {
      set.status = 401;
      return {
        code: "UNAUTHORIZED",
        message: "Authentication required",
      };
    }
  });
