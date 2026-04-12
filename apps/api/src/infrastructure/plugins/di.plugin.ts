import { Elysia } from "elysia";

// DI plugin: register singletons via .decorate() and per-request context via .derive()
//
// Example usage:
//   .decorate('userRepo', new DrizzleUserRepo(db))
//   .derive(({ headers }) => ({ currentUser: extractUser(headers) }))

export const diPlugin = new Elysia({ name: "di" });
