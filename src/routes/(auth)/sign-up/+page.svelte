<script lang="ts">
  import googleSvg from "$lib/assets/icons/google.svg";
  import AuthHelperLink from "$lib/components/ui/auth-helper-link/auth-helper-link.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import FormControl from "$lib/components/ui/form/form-control.svelte";

  import Input from "$lib/components/ui/input/input.svelte";
</script>

<div class="form-container">
  <form class="form">
    <div class="header">
      <h2 class="title">Create new account</h2>

      <p class="description">To use snapgram, Please enter your details.</p>
    </div>

    <FormControl label="Name" for="name">
      <Input name="name" id="name" />
    </FormControl>

    <FormControl label="Email" for="email">
      <Input name="email" id="email" />
    </FormControl>

    <FormControl label="Password" for="password">
      <Input type="password" name="password" id="password" />
    </FormControl>

    <div class="button-group">
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
    </div>

    <div class="helper-link">
      <AuthHelperLink label="Log in" href="/sign-in">
        Already have an account?
      </AuthHelperLink>
    </div>
  </form>
</div>

<style>
  .form-container {
    container-type: inline-size;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .title {
    font: var(--heading-sm);
    color: var(--color-text-high-emphasis);
  }

  .description {
    color: var(--color-text-low-emphasis);
    font: var(--text-sm-regular);
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
