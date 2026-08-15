import { sql } from "drizzle-orm";
import { check, integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const follow = pgTable("follow", {
  followerId: integer("follower_id").notNull().references(() => user.id),
  followingId: integer("following_id").notNull().references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, table => [
  primaryKey({ columns: [table.followerId, table.followingId] }),
  check("no_self_follow", sql`${table.followerId} <> ${table.followingId}`),
]);
