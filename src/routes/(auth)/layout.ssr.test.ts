import { createRawSnippet } from "svelte";
import { render } from "svelte/server";

import { describe, expect, it } from "vitest";
import Layout from "./+layout.svelte";

describe("layout (auth) SSR", () => {
  it("should render children correctly", async () => {
    const children = createRawSnippet(() => ({
      render: () => "<h1>Title</h1>",
    }));

    const { body } = render(Layout, { props: { children } });

    expect(body).toContain("<h1>Title</h1>");
  });
});
