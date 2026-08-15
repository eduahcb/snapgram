import { bigint, integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { post } from "./post";

export const postLike = pgTable(
  "post_like",
  {
    userId: integer("user_id").notNull().references(() => user.id),
    postId: bigint("post_id", { mode: "number" }).notNull().references(() => post.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  table => [primaryKey({ columns: [table.userId, table.postId] })],
);
