import type { EmailSender } from "$lib/server/email/sender";
import { createHtml } from "$lib/server/email/create-email-html";

import VerificationTemplate from "$lib/server/email/templates/verify-email.svelte";

export interface EmailService {
  sendVerification: (to: string, otp: string) => Promise<void>;
}

export function createEmailService(emailSender: EmailSender): EmailService {
  const sendVerification = async (to: string, otp: string) => {
    const html = await createHtml(VerificationTemplate, { otp });

    await emailSender.send({
      to,
      html,
      subject: `Your verification code: ${otp}`,
    });
  };

  return {
    sendVerification,
  };
}
