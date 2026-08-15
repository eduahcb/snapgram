import { bigserial, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const post = pgTable("post", {
  id: bigserial({ mode: "number" }).primaryKey(),
  uuid: uuid().notNull().unique(),
  authorId: integer("author_id").notNull().references(() => user.id),
  imageKey: text("image_key").notNull(),
  caption: text(),
  location: text(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
