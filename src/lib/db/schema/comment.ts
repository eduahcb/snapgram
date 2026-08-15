import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { bigint, bigserial, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { post } from "./post";

export const comment = pgTable("comment", {
  id: bigserial({ mode: "number" }).primaryKey(),
  uuid: uuid().notNull().unique(),
  postId: bigint("post_id", { mode: "number" }).notNull().references(() => post.id),
  authorId: integer("user_id").notNull().references(() => user.id),
  parentCommentId: bigint("parent_comment_id", { mode: "number" }).references((): AnyPgColumn => comment.id),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
