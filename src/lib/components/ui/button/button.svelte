<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  type ButtonProps = {
    class?: ClassValue;
    children: Snippet;
    disabled?: boolean;
    type?: "button" | "submit" | undefined;
  };

  const {
    children,
    class: classProp,
    disabled,
    type = "button",
  }: ButtonProps = $props();
</script>

<button class={["button", classProp]} {disabled} {type}>
  {@render children()}
</button>

<style>
  .button {
    appearance: none;
    -webkit-appearance: none;
    border: none;
    width: 100%;

    height: 2.5rem;
    background-color: var(--button-bg, var(--color-background-surface-high));
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    font: var(--text-sm-regular);
    color: var(--button-color, var(--color-text));

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    &:disabled {
      opacity: 0.6;
    }

    &:hover {
      filter: brightness(1.125);
    }
  }
</style>
