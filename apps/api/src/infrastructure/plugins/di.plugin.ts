import { Elysia } from "elysia";
import { ResendEmailAdapter } from "../email/resend-email.adapter";

export const diPlugin = new Elysia({ name: "di" }).decorate(
  "emailService",
  new ResendEmailAdapter(process.env.RESEND_API_KEY ?? ""),
);
