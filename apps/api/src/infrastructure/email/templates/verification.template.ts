import { createBaseLayout } from "./base-layout";

const appName = process.env.APP_NAME ?? "SaaS Starter";

export function renderVerificationEmail(params: {
  name: string;
  url: string;
}): { subject: string; html: string; text: string } {
  const { name, url } = params;

  const content = `
    <h2 style="margin:0 0 16px;color:#18181b;font-size:22px;font-weight:600;">Verify your email</h2>
    <p style="margin:0 0 16px;color:#3f3f46;font-size:15px;line-height:1.6;">
      Hi ${name}, please verify your email address to get started with ${appName}.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr>
        <td style="background-color:#18181b;border-radius:6px;">
          <a href="${url}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
            Verify Email Address
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0;color:#71717a;font-size:13px;line-height:1.6;">
      If the button doesn't work, copy and paste this link into your browser:<br />
      <a href="${url}" style="color:#18181b;word-break:break-all;">${url}</a>
    </p>`;

  return {
    subject: `Verify your email for ${appName}`,
    html: createBaseLayout(content),
    text: `Hi ${name},\n\nPlease verify your email address to get started with ${appName}.\n\nVerify here: ${url}\n\nIf you didn't create an account, you can safely ignore this email.`,
  };
}
