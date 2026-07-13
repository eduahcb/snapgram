import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { page } from "vitest/browser";

import FormControl from "./form-control.svelte";

describe("form-control", () => {
  it("should throw when children not passed", async () => {
    await expect(render(FormControl)).rejects.toThrow("invalid_snippet");
  });

  it("should render children correctly", async () => {
    const children = createRawSnippet(() => ({
      render: () => `<input type="text" placeholder="username" name="username"/>`,
    }));

    await render(FormControl, { children });

    const userNameInput = page.getByRole("textbox", { name: "username" });

    await expect.element(userNameInput).toHaveAttribute("type", "text");
  });

  it("should render label snippet correctly", async () => {
    const children = createRawSnippet(() => ({
      render: () => `<input type="text" placeholder="username" name="username" id="username"/>`,
    }));

    await render(FormControl, { children, label: "Username", for: "username" });

    const userNameInput = page.getByLabelText("Username");

    await expect.element(userNameInput).toBeInTheDocument();
  });
});
