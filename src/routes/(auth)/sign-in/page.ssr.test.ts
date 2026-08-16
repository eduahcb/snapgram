import { render } from "svelte/server";

import { describe, expect, it } from "vitest";
import Signin from "./+page.svelte";

describe("sign-in page", () => {
  it("should render form title correctly", () => {
    const { body } = render(Signin);

    expect(body).toContain(">Log in to your account<");
  });

  it("should render sign in button", () => {
    const { body } = render(Signin);

    expect(body).toContain("Log in");
  });

  it("should render sign up with google button", () => {
    const { body } = render(Signin);

    expect(body).toContain("Sign in with google");
  });
});
