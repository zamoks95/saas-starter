import { Elysia } from "elysia";
import { db } from "@repo/db";
import { DrizzleUserRepository } from "../persistence/drizzle-user.repository";
import { ResendEmailAdapter } from "../email/resend-email.adapter";

export const diPlugin = new Elysia({ name: "di" })
  .decorate("userRepo", new DrizzleUserRepository(db))
  .decorate("emailService", new ResendEmailAdapter(process.env.RESEND_API_KEY ?? ""));
