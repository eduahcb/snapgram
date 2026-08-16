import type { DB } from "$lib/server/db/client";
import * as schema from "$lib/db/schema";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { username } from "better-auth/plugins";

export function createAuth(db: DB, url: string) {
  return betterAuth({
    baseURL: url,
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      username(),
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
