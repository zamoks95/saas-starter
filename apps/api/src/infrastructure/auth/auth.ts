import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@repo/db";
import { ResendEmailAdapter } from "../email/resend-email.adapter";
import {
  renderPasswordResetEmail,
  renderVerificationEmail,
  renderWelcomeEmail,
} from "../email/templates";

const emailService = new ResendEmailAdapter(
  process.env.RESEND_API_KEY ?? "",
);
const fromEmail =
  process.env.APP_SUPPORT_EMAIL ?? "noreply@example.com";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const email = renderPasswordResetEmail({
        name: user.name,
        url,
      });
      void emailService.send({
        to: user.email,
        from: fromEmail,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const email = renderVerificationEmail({
        name: user.name,
        url,
      });
      void emailService.send({
        to: user.email,
        from: fromEmail,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const email = renderWelcomeEmail({ name: user.name });
          void emailService.send({
            to: user.email,
            from: fromEmail,
            subject: email.subject,
            html: email.html,
            text: email.text,
          });
        },
      },
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});
