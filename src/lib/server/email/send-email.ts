import { EMAIL_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "$env/static/private";

import nodemailer from "nodemailer";

export async function sendEmail(email: string, otp: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: `Your verification code: ${otp}`,
    html,
  });
}
