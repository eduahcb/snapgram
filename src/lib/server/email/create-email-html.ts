import { Renderer } from "@better-svelte-email/server";

export async function createHtml(component: any, props: any): Promise<string> {
  const { render } = new Renderer({ disableTailwind: true });

  const html = await render(component, { props });

  return html;
}
