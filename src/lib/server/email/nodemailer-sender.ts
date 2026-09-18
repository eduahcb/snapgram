import type { Email, EmailSender } from "./sender";

import { EMAIL_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "$env/static/private";

import nodemailer from "nodemailer";

export function createNodemailerSender(): EmailSender {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const send = async ({ to, html, subject }: Email) => {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });
  };

  return {
    send,
  };
}
