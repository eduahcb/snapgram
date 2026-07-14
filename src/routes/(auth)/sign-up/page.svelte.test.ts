import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { page } from "vitest/browser";

import SignUpPage from "./+page.svelte";

describe("sign-up page", () => {
  it("should render form title correctly", async () => {
    await render(SignUpPage);

    const title = page.getByRole("heading", {
      level: 2,
      name: "Create new account",
    });

    await expect.element(title).toBeInTheDocument();
  });

  it("should render sign up button", async () => {
    await render(SignUpPage);

    const button = page.getByRole("button", {
      name: "Sign Up",
    });

    await expect.element(button).toBeInTheDocument();
  });

  it("should render sign up with google button", async () => {
    await render(SignUpPage);

    const button = page.getByRole("button", {
      name: "Signup with google",
    });

    await expect.element(button).toBeInTheDocument();
  });
});
