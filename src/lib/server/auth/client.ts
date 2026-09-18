import type { DB } from "$lib/server/db/client";
import type { EmailService } from "$lib/server/email/email-service";

import * as schema from "$lib/db/schema";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP, username } from "better-auth/plugins";

export function createAuth(db: DB, url: string, emailService: EmailService) {
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
            await emailService.sendVerification(email, otp);
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
