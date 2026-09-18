export type Email = {
  to: string;
  subject: string;
  html: string;
};

export interface EmailSender {
  send: (email: Email) => Promise<void>;
}
