import { createRawSnippet } from "svelte";
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import { page } from "vitest/browser";

import Form from "./form.svelte";

describe("form", () => {
  it("should render children correctly", async () => {
    const children = createRawSnippet(() => ({
      render: () => `<input type="text" placeholder="username" name="username"/>`,
    }));

    await render(Form, { children });

    const username = page.getByRole("textbox", { name: "username" });

    expect(username).toBeInTheDocument();
  });

  it("should render header if exists", async () => {
    const header = createRawSnippet(() => ({
      render: () => `<h1>Header</h1>`,
    }));

    await render(Form, { header });

    const title = page.getByRole("heading", { level: 1, name: "Header" });

    expect(title).toBeInTheDocument();
  });

  it("should render actions if exists", async () => {
    const actions = createRawSnippet(() => ({
      render: () => `<button>confirm</button>`,
    }));

    await render(Form, { actions });

    const title = page.getByRole("button", { name: "confirm" });

    expect(title).toBeInTheDocument();
  });

  it("should render footer if exists", async () => {
    const footer = createRawSnippet(() => ({
      render: () => `<a href="#">test</a>`,
    }));

    await render(Form, { footer });

    const title = page.getByRole("link", { name: "test" });

    expect(title).toBeInTheDocument();
  });

  it("should trigger on submit", async () => {
    const actions = createRawSnippet(() => ({
      render: () => `<button type="submit">confirm</button>`,
    }));

    const submitMock = vi.fn();

    await render(Form, {
      props: {
        actions,
        method: "POST",
        submit: submitMock,
      },
    });

    await page.getByRole("button", { name: "confirm" }).click();

    expect(submitMock).toHaveBeenCalled();
  });

  it("should call the result handler returned by submit", async () => {
    const actions = createRawSnippet(() => ({
      render: () => `<button type="submit">confirm</button>`,
    }));

    const resultHandler = vi.fn();
    const submitMock = vi.fn().mockResolvedValue(resultHandler);

    await render(Form, {
      props: {
        actions,
        method: "POST",
        submit: submitMock,
      },
    });

    await page.getByRole("button", { name: "confirm" }).click();

    await expect.poll(() => resultHandler).toHaveBeenCalled();
  });
});
