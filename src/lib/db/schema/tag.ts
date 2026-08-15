import { bigserial, pgTable, text } from "drizzle-orm/pg-core";

export const tag = pgTable("tag", {
  id: bigserial({ mode: "number" }).primaryKey(),
  name: text("name").notNull().unique(),
});
