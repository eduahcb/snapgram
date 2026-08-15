<script lang="ts">
  import googleSvg from "$lib/assets/icons/google.svg";
  import AuthHelperLink from "$lib/components/ui/auth-helper-link/auth-helper-link.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import FormControl from "$lib/components/ui/form/form-control.svelte";
  import Form from "$lib/components/ui/form/form.svelte";

  import Input from "$lib/components/ui/input/input.svelte";
</script>

<Form>
  {#snippet header()}
    <h2 class="title">Create new account</h2>

    <p class="description">To use snapgram, Please enter your details.</p>
  {/snippet}

  <FormControl label="Name" for="name">
    <Input name="name" id="name" autocomplete="name" />
  </FormControl>

  <FormControl label="Email" for="email">
    <Input name="email" id="email" autocomplete="email" />
  </FormControl>

  <FormControl label="Password" for="password">
    <Input
      type="password"
      name="password"
      id="password"
      autocomplete="new-password"
    />
  </FormControl>

  {#snippet actions()}
    <Button class={["submit"]} --button-bg="var(--color-primary)">
      Sign Up
    </Button>

    <Button
      class={["submit"]}
      --button-color="var(--color-background-surface-high)"
      --button-bg="var(--color-primary-on-color)"
    >
      <img src={googleSvg} alt="google log" width="24" height="24" />
      Signup with google
    </Button>
  {/snippet}

  {#snippet footer()}
    <AuthHelperLink label="Log in" href="/sign-in">
      Already have an account?
    </AuthHelperLink>
  {/snippet}
</Form>

<style>
  .title {
    font: var(--heading-sm);
    color: var(--color-text-high-emphasis);
    margin-bottom: 0.75rem;
  }

  .description {
    color: var(--color-text-low-emphasis);
    font: var(--text-sm-regular);
  }

  @container (min-width: 45rem) {
    .title {
      font: var(--heading-md);
      color: var(--color-text-high-emphasis);
    }

    .description {
      color: var(--color-text-low-emphasis);
      font: var(--text-md-regular);
    }
  }
</style>
