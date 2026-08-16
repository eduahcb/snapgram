import type { Auth } from "$lib/server/auth/client";
import type { Actions } from "./$types";
import { usernameNormalized } from "$lib/utils/username-normalized";
import { fail, redirect } from "@sveltejs/kit";
import { isAPIError } from "better-auth/api";
import * as v from "valibot";

const SignupSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty("name is required"),
  ),
  email: v.pipe(
    v.string(),
    v.nonEmpty("email is required"),
    v.email("email should be valid"),
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("password is required"),
    v.minLength(8, "password must be at least 8 characters long."),
  ),
});

type Signup = v.InferOutput<typeof SignupSchema>;

const MAX_SIGNUP_ATTEMPTS = 2;

async function signUpWithUniqueUsername(user: Signup, auth: Auth) {
  let username = usernameNormalized(user.name);

  for (let attempt = 0; attempt < MAX_SIGNUP_ATTEMPTS; attempt++) {
    try {
      return await auth.api.signUpEmail({
        body: {
          ...user,
          username,
        },
      });
    }
    catch (error) {
      const isUsernameTaken = isAPIError(error) && error.body?.code === "USERNAME_IS_ALREADY_TAKEN";
      const isLastAttempt = attempt === MAX_SIGNUP_ATTEMPTS - 1;

      if (!isUsernameTaken || isLastAttempt) {
        throw error;
      }

      username = usernameNormalized(user.name, username);
    }
  }
}

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = v.safeParse(SignupSchema, data);

    if (!result.success) {
      return fail(400, {
        errors: v.flatten(result.issues),
      });
    }

    const user = result.output;

    try {
      await signUpWithUniqueUsername(user, locals.auth);
    }
    catch (error) {
      if (!isAPIError(error)) {
        console.error("sign-up: unexpected error", error);

        const errors: v.FlatErrors<typeof SignupSchema> = {
          root: ["unexpected error"],
        };

        return fail(500, { errors });
      }

      const errors: v.FlatErrors<typeof SignupSchema> = {
        root: [error.body?.message ?? "failed to create user"],
      };

      return fail(error.statusCode, { errors });
    }

    redirect(303, "/auth/verification");
  },
} satisfies Actions;
