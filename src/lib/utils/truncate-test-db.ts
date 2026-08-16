import type { DB } from "$lib/server/db/client";
import { sql } from "drizzle-orm";

export async function truncateAll(db: DB) {
  const { rows } = await db.execute<{ tablename: string }>(sql`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public' AND tablename NOT LIKE '__drizzle%'
  `);

  if (rows.length === 0)
    return;

  const tables = rows.map(r => `"${r.tablename}"`).join(", ");
  await db.execute(sql.raw(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE`));
}
