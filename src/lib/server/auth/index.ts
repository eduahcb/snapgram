import { BETTER_AUTH_URL } from "$env/static/private";
import { db } from "$lib/server/db";

import { createAuth } from "./client";

export const auth = createAuth(db, BETTER_AUTH_URL);
