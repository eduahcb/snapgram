<script lang="ts">
  import favicon from "$lib/assets/icons/favicon.ico";

  import { Toaster } from "svelte-sonner";
  // Supports weights 100-900
  import "@fontsource-variable/inter/wght.css";

  import "../app.css";

  const { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Snapgram</title>
  <meta name="description" content="Your favorite social media is here." />
</svelte:head>

<Toaster richColors />
{@render children()}
