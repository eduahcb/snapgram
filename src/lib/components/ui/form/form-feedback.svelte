<script lang="ts">
  import type { Snippet } from "svelte";

  type FormFeedbackProp = {
    id?: string;
    children: Snippet;
  };

  const { id, children }: FormFeedbackProp = $props();
</script>

<span {id} class="text">{@render children()}</span>

<style>
  .text {
    margin-top: 0.5rem;
    font: var(--text-sm-regular);
  }
</style>
