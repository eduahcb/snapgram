import process from "node:process";
import { defineConfig } from "drizzle-kit";

process.loadEnvFile("./.env.local");

export default defineConfig({
  out: "./src/lib/server/db/migrations",
  schema: "./src/lib/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
