<script lang="ts">
  import type { Pathname } from "$app/types";
  import { resolve } from "$app/paths";

  type AuthHelperLink = {
    href?: Pathname;
    label: string;
  };

  const { href, label }: AuthHelperLink = $props();
</script>

<p class="text">
  Don’t have an account?

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
