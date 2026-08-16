import { render } from "svelte/server";

import { describe, expect, it } from "vitest";
import SignUpPage from "./+page.svelte";

describe("sign-up page", () => {
  it("should render form title correctly", () => {
    const { body } = render(SignUpPage, { props: { form: null } });

    expect(body).toContain(">Create new account<");
  });

  it("should render sign up button", () => {
    const { body } = render(SignUpPage, { props: { form: null } });

    expect(body).toContain("Sign Up");
  });

  it("should render sign up with google button", () => {
    const { body } = render(SignUpPage, { props: { form: null } });

    expect(body).toContain("Signup with google");
  });

  it("should render auth-helper-link", () => {
    const { body } = render(SignUpPage, { props: { form: null } });

    // eslint-disable-next-line style/quotes
    expect(body).toContain('href="/sign-in"');
  });

  it("should display validation errors returned by actions", () => {
    const { body } = render(SignUpPage, {
      props: {
        form: {
          errors: {
            nested: {
              name: ["name is required"],
              email: ["email is required"],
              password: ["password is required"],
            },
          },
        },
      },
    });

    expect(body).toContain("name is required");
    expect(body).toContain("email is required");
    expect(body).toContain("password is required");
  });

  it("should mark only the invalid field", () => {
    const { body } = render(SignUpPage, {
      props: {
        form: {
          errors: {
            nested: {
              name: ["name is required"],
            },
          },
        },
      },
    });

    const nameInput = body.match(/<input[^>]*\sid="name"[^>]*>/)?.[0];
    const emailInput = body.match(/<input[^>]*\sid="email"[^>]*>/)?.[0];

    expect(nameInput).toContain("aria-invalid=\"true\"");
    expect(emailInput).toContain("aria-invalid=\"false\"");
  });
});
