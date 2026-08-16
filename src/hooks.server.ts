import type { Handle } from "@sveltejs/kit";
import { building } from "$app/environment";
import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";

export const handle: Handle = ({ event, resolve }) => {
  event.locals.auth = auth;

  return svelteKitHandler({ event, resolve, auth, building });
};
