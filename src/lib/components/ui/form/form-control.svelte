<script lang="ts">
  import type { Snippet } from "svelte";

  type FormControlProps = {
    label?: string;
    for?: string;
    children: Snippet;
    error?: boolean;
  };

  const { label, for: htmlFor, children, error }: FormControlProps = $props();
</script>

<div class={["form-control", error && "form-control--error"]}>
  {#if label}
    <label class="label" for={htmlFor}>{label}</label>
  {/if}
  {@render children()}
</div>

<style>
  .form-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;
  }

  .label {
    font: var(--text-md-regular);
    color: var(--color-text);
    margin-bottom: 0.75rem;
  }

  .form-control--error {
    color: red;
  }
</style>
