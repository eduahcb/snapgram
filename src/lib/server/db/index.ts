import { DB_URL } from "$env/static/private";

import { createDatabase } from "./client";

export const db = createDatabase(DB_URL);
