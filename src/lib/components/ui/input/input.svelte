<script lang="ts">
  import type { FullAutoFill } from "svelte/elements";

  type InputProps = {
    type?: string;
    name?: string;
    placeholder?: string;
    id?: string;
    disabled?: boolean;
    autocomplete?: FullAutoFill | null | undefined;
    ariaInvalid?: boolean;
    ariaDescribedBy?: string;
  };

  const {
    type = "text",
    disabled = false,
    ariaInvalid,
    ariaDescribedBy,
    ...props
  }: InputProps = $props();
</script>

<input
  class="input"
  {type}
  {disabled}
  aria-describedby={ariaDescribedBy}
  aria-invalid={ariaInvalid}
  {...props}
/>

<style>
  .input {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
    border: none;

    height: 2.5rem;
    background-color: var(--color-background-surface-high);
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    font: var(--text-sm-regular);
    color: var(--color-text);

    &::placeholder {
      color: var(--color-text-low-emphasis);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
</style>
