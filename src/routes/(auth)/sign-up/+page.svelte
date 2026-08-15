<script lang="ts">
  import googleSvg from "$lib/assets/icons/google.svg";
  import loaderSVG from "$lib/assets/icons/loader.svg";
  import AuthHelperLink from "$lib/components/ui/auth-helper-link/auth-helper-link.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import FormControl from "$lib/components/ui/form/form-control.svelte";
  import FormFeedback from "$lib/components/ui/form/form-feedback.svelte";

  import Form from "$lib/components/ui/form/form.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  const { form } = $props();

  let loading = $state(false);
</script>

<Form
  method="POST"
  submit={() => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      await update();
    };
  }}
>
  {#snippet header()}
    <h2 class="title">Create new account</h2>

    <p class="description">To use snapgram, Please enter your details.</p>
  {/snippet}

  <FormControl label="Name" for="name" error={!!form?.errors.nested?.name}>
    <Input
      name="name"
      id="name"
      autocomplete="name"
      ariaInvalid={!!form?.errors.nested?.name}
      ariaDescribedBy={form?.errors.nested?.name ? "name-error" : undefined}
    />
    {#if form?.errors.nested?.name}
      <FormFeedback id="name-error">{form?.errors.nested.name}</FormFeedback>
    {/if}
  </FormControl>

  <FormControl label="Email" for="email" error={!!form?.errors.nested?.email}>
    <Input
      name="email"
      id="email"
      autocomplete="email"
      ariaInvalid={!!form?.errors.nested?.email}
      ariaDescribedBy={form?.errors.nested?.email ? "email-error" : undefined}
    />

    {#if form?.errors.nested?.email}
      <FormFeedback id="email-error">{form?.errors.nested.email}</FormFeedback>
    {/if}
  </FormControl>

  <FormControl
    label="Password"
    for="password"
    error={!!form?.errors.nested?.password}
  >
    <Input
      type="password"
      name="password"
      id="password"
      autocomplete="new-password"
      ariaInvalid={!!form?.errors.nested?.password}
      ariaDescribedBy={form?.errors.nested?.password
        ? "password-error"
        : undefined}
    />

    {#if form?.errors.nested?.password}
      <FormFeedback id="password-error">
        {form?.errors.nested.password}
      </FormFeedback>
    {/if}
  </FormControl>

  {#snippet actions()}
    <Button
      type="submit"
      class={["submit"]}
      --button-bg="var(--color-primary)"
      disabled={loading}
    >
      {#if loading}
        <img src={loaderSVG} alt="loader spinner" width="18" height="18" />
      {/if}
      Sign Up
    </Button>

    <Button
      type="submit"
      class={["submit"]}
      --button-color="var(--color-background-surface-high)"
      --button-bg="var(--color-primary-on-color)"
      disabled={loading}
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
