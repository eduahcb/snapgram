import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

export async function createTestDb() {
  const container = await new PostgreSqlContainer("postgres:18").start();
  const pool = new Pool({ connectionString: container.getConnectionUri() });

  await migrate(drizzle({ client: pool }), {
    migrationsFolder: "./src/lib/server/db/migrations",
  });
  await pool.end();

  return container;
}
