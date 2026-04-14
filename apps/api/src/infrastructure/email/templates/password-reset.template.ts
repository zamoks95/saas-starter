import { createBaseLayout } from "./base-layout";

const appName = process.env.APP_NAME ?? "SaaS Starter";

export function renderPasswordResetEmail(params: {
  name: string;
  url: string;
}): { subject: string; html: string; text: string } {
  const { name, url } = params;

  const content = `
    <h2 style="margin:0 0 16px;color:#18181b;font-size:22px;font-weight:600;">Reset your password</h2>
    <p style="margin:0 0 16px;color:#3f3f46;font-size:15px;line-height:1.6;">
      Hi ${name}, we received a request to reset the password for your ${appName} account.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr>
        <td style="background-color:#18181b;border-radius:6px;">
          <a href="${url}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
            Reset Password
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 16px;color:#71717a;font-size:13px;line-height:1.6;">
      If the button doesn't work, copy and paste this link into your browser:<br />
      <a href="${url}" style="color:#18181b;word-break:break-all;">${url}</a>
    </p>
    <p style="margin:0;color:#71717a;font-size:13px;line-height:1.6;">
      If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
    </p>`;

  return {
    subject: `Reset your ${appName} password`,
    html: createBaseLayout(content),
    text: `Hi ${name},\n\nWe received a request to reset the password for your ${appName} account.\n\nReset your password here: ${url}\n\nIf you didn't request a password reset, you can safely ignore this email. Your password will not be changed.`,
  };
}
