<script lang="ts">
  import googleSvg from "$lib/assets/icons/google.svg";
  import logoSvg from "$lib/assets/images/logo.svg";
  import AuthHelperLink from "$lib/components/ui/auth-helper-link/auth-helper-link.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import FormControl from "$lib/components/ui/form/form-control.svelte";

  import Form from "$lib/components/ui/form/form.svelte";

  import Input from "$lib/components/ui/input/input.svelte";
</script>

<Form>
  {#snippet header()}
    <div class="brand-container">
      <img src={logoSvg} alt="" />
    </div>

    <h2 class="title">Log in to your account</h2>
    <p class="description">welcome back! Please enter your details</p>
  {/snippet}

  <FormControl label="Email" for="email">
    <Input name="email" id="email" autocomplete="email" />
  </FormControl>

  <FormControl label="Password" for="password">
    <Input
      type="password"
      name="password"
      id="password"
      autocomplete="current-password"
    />
  </FormControl>

  {#snippet actions()}
    <Button class={["submit"]} --button-bg="var(--color-primary)">
      Log in
    </Button>

    <Button
      class={["submit"]}
      --button-color="var(--color-background-surface-high)"
      --button-bg="var(--color-primary-on-color)"
    >
      <img src={googleSvg} alt="google log" width="24" height="24" />
      Sign in with google
    </Button>
  {/snippet}

  {#snippet footer()}
    <AuthHelperLink label="Sign up" href="/sign-up">
      Don't have an account?
    </AuthHelperLink>
  {/snippet}
</Form>

<style>
  .brand-container {
    margin-bottom: 4.25rem;
  }

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
