import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { page } from "vitest/browser";

import AuthHelperLink from "./auth-helper-link.svelte";

describe("auth-helper-link", () => {
  it("should throw when children is not provided", async () => {
    await expect(render(AuthHelperLink)).rejects.toThrow("invalid_snippet");
  });

  it("should render children correctly", async () => {
    const children = createRawSnippet(() => ({
      render: () => `Are you sure?`,
    }));

    await render(AuthHelperLink, { children, label: "", href: "/" });

    const text = page.getByText("Are you sure?");

    await expect.element(text).toBeInTheDocument();
  });

  it("should render anchor when href and anchor are provided", async () => {
    const children = createRawSnippet(() => ({
      render: () => `Are you sure?`,
    }));

    await render(AuthHelperLink, { children, label: "Go here", href: "/sign-in" });

    const anchor = page.getByRole("link", { name: "Go here" });

    await expect.element(anchor).toHaveAttribute("href", "/sign-in");
  });
});
