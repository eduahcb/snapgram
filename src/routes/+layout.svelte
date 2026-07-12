<script lang="ts">
  import favicon from "$lib/assets/icons/favicon.ico";

  // Supports weights 100-900
  import "@fontsource-variable/inter/wght.css";

  import "../app.css";

  const { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Snapgram</title>
</svelte:head>

{@render children()}
