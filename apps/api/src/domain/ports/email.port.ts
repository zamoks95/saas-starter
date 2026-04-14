export interface SendEmailParams {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailPort {
  send(params: SendEmailParams): Promise<{ id: string }>;
}
