import type { Component } from "svelte";

import { Renderer } from "@better-svelte-email/server";

export async function createHtml<Props extends Record<string, unknown>>(
  component: Component<Props>,
  props: Props,
): Promise<string> {
  const { render } = new Renderer({ disableTailwind: true });

  const html = await render(component, { props });

  return html;
}
