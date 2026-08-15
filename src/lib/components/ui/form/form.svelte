<script lang="ts">
  import type { Snippet } from "svelte";

  type FormProp = {
    header?: Snippet;
    actions?: Snippet;
    footer?: Snippet;
    children?: Snippet;
  };

  const { header, actions, footer, children }: FormProp = $props();
</script>

<div class="form-container">
  <form class="form">
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
