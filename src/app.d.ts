import type { Auth } from "$lib/server/auth/client";
import type { DB } from "$lib/server/db/client";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      db: DB;
      auth: Auth;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
