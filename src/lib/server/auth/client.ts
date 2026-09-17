import type { DB } from "$lib/server/db/client";
import * as schema from "$lib/db/schema";

import { createHtml } from "$lib/server/email/create-email-html";
import { sendEmail } from "$lib/server/email/send-email";
import VerifyEmail from "$lib/server/email/verify-email.svelte";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP, username } from "better-auth/plugins";

export function createAuth(db: DB, url: string) {
  return betterAuth({
    baseURL: url,
    emailAndPassword: {
      enabled: true,
    },
    emailVerification: {
      sendOnSignUp: true,
    },
    plugins: [
      username(),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          if (type === "email-verification") {
            const html = await createHtml(VerifyEmail, { otp });
            await sendEmail(email, otp, html);
          }
        },
        overrideDefaultEmailVerification: true,
      }),
    ],
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    advanced: {
      database: {
        generateId: false,
      },
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
