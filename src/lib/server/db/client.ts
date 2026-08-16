import { relations } from "$lib/db/schema/relations";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export function createDatabase(connectionString: string) {
  const pool = new Pool({
    connectionString,
  });

  return drizzle({ client: pool, relations });
}

export type DB = ReturnType<typeof createDatabase>;
