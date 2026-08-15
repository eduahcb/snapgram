import { bigint, integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { comment } from "./comment";

export const commentLike = pgTable(
  "comment_like",
  {
    userId: integer("user_id").notNull().references(() => user.id),
    commentId: bigint("comment_id", { mode: "number" }).notNull().references(() => comment.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  table => [primaryKey({ columns: [table.userId, table.commentId] })],
);
