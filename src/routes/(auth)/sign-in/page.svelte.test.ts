import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { page } from "vitest/browser";

import Signin from "./+page.svelte";

describe("sign-in page", () => {
  it("should render form title correctly", async () => {
    await render(Signin);

    const title = page.getByRole("heading", {
      level: 2,
      name: "Log in",
    });

    await expect.element(title).toBeInTheDocument();
  });

  it("should render sign in button", async () => {
    await render(Signin);

    const button = page.getByRole("button", {
      name: "Log in",
    });

    await expect.element(button).toBeInTheDocument();
  });

  it("should render sign up with google button", async () => {
    await render(Signin);

    const button = page.getByRole("button", {
      name: "Sign in with google",
    });

    await expect.element(button).toBeInTheDocument();
  });
});
