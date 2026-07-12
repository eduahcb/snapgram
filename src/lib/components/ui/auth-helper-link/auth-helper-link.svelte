<script lang="ts">
  import type { Pathname } from "$app/types";
  import type { Snippet } from "svelte";
  import { resolve } from "$app/paths";

  type AuthHelperLinkProps = {
    href?: Pathname;
    label: string;
    children: Snippet;
  };

  const { href, label, children }: AuthHelperLinkProps = $props();
</script>

<p class="text">
  {@render children()}

  {#if href}
    <a class="link" href={resolve(href)}>{label}</a>
  {/if}
</p>

<style>
  .text {
    font: var(--text-sm-regular);
  }

  .link {
    color: var(--color-primary);
  }
</style>
