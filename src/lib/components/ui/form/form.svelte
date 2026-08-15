<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import type { Snippet } from "svelte";
  import { enhance } from "$app/forms";
  import { tick } from "svelte";

  type FormProp = {
    header?: Snippet;
    actions?: Snippet;
    footer?: Snippet;
    children?: Snippet;
    method?: "GET" | "POST" | "dialog";
    submit?: SubmitFunction;
  };

  // eslint-disable-next-line style/operator-linebreak
  const { header, actions, footer, children, method, submit }: FormProp =
    $props();

  const handleSubmit: SubmitFunction = async (input) => {
    const beforeSubmitResult = await submit?.(input);

    return async (opts) => {
      if (beforeSubmitResult) {
        await beforeSubmitResult(opts);
      }
      else {
        await opts.update();
      }

      await tick();
      input.formElement
        .querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
    };
  };
</script>

<div class="form-container">
  <form class="form" {method} use:enhance={handleSubmit}>
    {#if header}
      <div class="header">
        {@render header()}
      </div>
    {/if}

    {@render children?.()}

    {#if actions}
      <div class="button-group">
        {@render actions()}
      </div>
    {/if}

    {#if footer}
      <div class="helper-link">
        {@render footer()}
      </div>
    {/if}
  </form>
</div>

<style>
  .form-container {
    container-type: inline-size;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .form {
    width: 100%;
    max-width: 25rem;
    padding: 1rem;
  }

  .header {
    width: inherit;
    text-align: center;
    margin-bottom: 2rem;
  }

  .button-group {
    margin-top: 1.875rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: center;
    justify-content: center;
  }

  .helper-link {
    width: 100%;
    text-align: center;
    margin-top: 1.875rem;
  }

  @container (min-width: 45rem) {
    .form {
      padding: 0;
    }
  }
</style>
