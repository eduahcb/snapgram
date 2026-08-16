import { BETTER_AUTH_URL } from "$env/static/private";
import * as schema from "$lib/db/schema";
import { betterAuth } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { username } from "better-auth/plugins";
import { db } from "./db/";

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
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
