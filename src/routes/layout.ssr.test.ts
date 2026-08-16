import { createRawSnippet } from "svelte";
import { render } from "svelte/server";

import { describe, expect, it } from "vitest";
import Layout from "./+layout.svelte";

describe("layout root SSR", () => {
  it("should include title", async () => {
    const children = createRawSnippet(() => ({
      render: () => `<h1>test</h1>`,
    }));
    const { head } = render(Layout, {
      props: {
        children,
      },
    });

    expect(head).toContain("<title>Snapgram</title>");
  });
});
