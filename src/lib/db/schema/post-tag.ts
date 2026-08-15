import { bigint, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { post } from "./post";
import { tag } from "./tag";

export const postTag = pgTable("post_tag", {
  postId: bigint("post_id", { mode: "number" }).notNull().references(() => post.id),
  tagId: bigint("tag_id", { mode: "number" }).notNull().references(() => tag.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, table => [primaryKey({ columns: [table.postId, table.tagId] })]);
