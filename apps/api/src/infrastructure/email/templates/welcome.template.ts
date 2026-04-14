import { createBaseLayout } from "./base-layout";

const appName = process.env.APP_NAME ?? "SaaS Starter";

export function renderWelcomeEmail(params: {
  name: string;
}): { subject: string; html: string; text: string } {
  const { name } = params;

  const content = `
    <h2 style="margin:0 0 16px;color:#18181b;font-size:22px;font-weight:600;">Welcome, ${name}!</h2>
    <p style="margin:0 0 16px;color:#3f3f46;font-size:15px;line-height:1.6;">
      Thanks for signing up for ${appName}. We're glad to have you on board.
    </p>
    <p style="margin:0;color:#3f3f46;font-size:15px;line-height:1.6;">
      If you have any questions, don't hesitate to reach out. We're here to help.
    </p>`;

  return {
    subject: `Welcome to ${appName}`,
    html: createBaseLayout(content),
    text: `Welcome, ${name}!\n\nThanks for signing up for ${appName}. We're glad to have you on board.\n\nIf you have any questions, don't hesitate to reach out. We're here to help.`,
  };
}
