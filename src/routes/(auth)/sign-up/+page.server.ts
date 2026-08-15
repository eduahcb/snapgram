import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import * as v from "valibot";

const SignUpSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty("name is required"),
  ),
  email: v.pipe(
    v.string(),
    v.email(),
    v.nonEmpty("email is required"),
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("password is required"),
  ),
});

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = v.safeParse(SignUpSchema, data);

    if (!result.success) {
      return fail(400, {
        errors: v.flatten(result.issues),
      });
    }
  },
} satisfies Actions;
