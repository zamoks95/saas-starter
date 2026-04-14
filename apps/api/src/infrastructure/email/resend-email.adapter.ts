import { Resend } from "resend";
import type { EmailPort, SendEmailParams } from "../../domain/ports/email.port";

export class ResendEmailAdapter implements EmailPort {
  private readonly client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(params: SendEmailParams): Promise<{ id: string }> {
    const { data, error } = await this.client.emails.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      html: params.html,
      text: params.text,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { id: data!.id };
  }
}
