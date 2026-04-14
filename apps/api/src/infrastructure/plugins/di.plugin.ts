import { Elysia } from "elysia";
import { db } from "@repo/db";
import { DrizzleUserRepository } from "../persistence/drizzle-user.repository";

export const diPlugin = new Elysia({ name: "di" }).decorate(
  "userRepo",
  new DrizzleUserRepository(db),
);
