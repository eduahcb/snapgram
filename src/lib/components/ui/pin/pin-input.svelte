<script lang="ts">
  type PinInputProps = {
    maxLength?: number;
    name: string;
    ariaLabel?: string;
    onComplete?: () => void;
    disabled?: boolean;
  };

  const {
    ariaLabel = "Verification code",
    name,
    maxLength = 6,
    onComplete,
    disabled = false,
  }: PinInputProps = $props();

  // svelte-ignore state_referenced_locally
  const digits = $state(Array.from<string>({ length: maxLength }).fill(""));
  const inputs = $state<HTMLElement[]>([]);
  const isComplete = $derived(digits.every((d) => d !== ""));

  function getValue(index: number) {
    return digits[index];
  }

  function setValue(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);

    digits[index] = digit;

    if (digit && index < maxLength - 1) {
      focusInput(index + 1);
    }
  }

  async function handleOnKeyDown(event: KeyboardEvent, index: number) {
    switch (event.key) {
      case "Backspace":
        event.preventDefault();
        digits[index] = "";

        if (index > 0) {
          focusInput(index - 1);
        }
        break;
      case "ArrowLeft":
        if (index > 0) {
          focusInput(index - 1);
        }
        break;
      case "ArrowRight":
        if (index < maxLength - 1) {
          focusInput(index + 1);
        }
        break;
    }
  }

  async function handleOnPaste(event: ClipboardEvent, index: number) {
    event.preventDefault();

    const value = event.clipboardData?.getData("text");

    // eslint-disable-next-line antfu/if-newline
    if (!value) return;

    if (value.length === maxLength) {
      const values = value.split("");

      values.forEach((v, index) => {
        digits[index] = v;
      });

      focusInput(maxLength - 1);
      return;
    }

    digits[index] = value.slice(-1);
  }

  function focusInput(index: number) {
    const input = inputs[index];
    input.focus();
  }

  $effect(() => {
    if (isComplete) {
      onComplete?.();
    }
  });
</script>

<div class="container" role="group" aria-label={ariaLabel}>
  {#each { length: maxLength }, index}
    <input
      id={`digit-${index}`}
      class="input"
      bind:this={inputs[index]}
      bind:value={() => getValue(index), (v) => setValue(index, v)}
      onkeydown={(event) => handleOnKeyDown(event, index)}
      onpaste={(event) => handleOnPaste(event, index)}
      maxlength="1"
      inputmode="numeric"
      {disabled}
      autocomplete={index === 0 ? "one-time-code" : "off"}
      aria-label={`Digit ${index + 1} of ${maxLength}`}
    />
  {/each}
  <input type="hidden" {name} value={digits.join("")} data-testid="pin-value" />
</div>

<style>
  .container {
    display: flex;
    gap: 0.5rem;
  }

  .input {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
    border: none;

    height: 4rem;
    width: 3rem;
    background-color: var(--color-background-surface-high);
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    font: var(--text-lg-regular);
    color: var(--color-text);
    text-align: center;

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
