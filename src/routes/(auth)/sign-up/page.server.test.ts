import { describe, expect, it } from "vitest";

import { actions } from "./+page.server";

type ActionEvent = Parameters<typeof actions.default>[0];

describe("sign up - Form Actions", () => {
  it("should return success request", async () => {
    const form = new FormData();

    form.append("name", "Eduardo Barbosa");
    form.append("email", "edu@test.com");
    form.append("password", "1da2d2ad2ad2a1");

    const request = new Request("http://localhost/(auth)/sign-up", {
      method: "POST",
      body: form,
    });

    const result = await actions.default({
      request,
      locals: {},
    } as ActionEvent);

    expect(result?.status).toBeUndefined();
  });

  it("should return bad request", async () => {
    const form = new FormData();

    form.append("name", "");
    form.append("email", "");
    form.append("password", "");

    const request = new Request("http://localhost/(auth)/sign-up", {
      method: "POST",
      body: form,
    });

    const result = await actions.default({
      request,
      locals: {},
    } as ActionEvent);

    expect(result?.status).toBe(400);
  });

  it("return message errors correctly", async () => {
    const form = new FormData();

    form.append("name", "");
    form.append("email", "");
    form.append("password", "");

    const request = new Request("http://localhost/(auth)/sign-up", {
      method: "POST",
      body: form,
    });

    const result = await actions.default({
      request,
      locals: {},
    } as ActionEvent);

    expect(result?.data?.errors.nested?.name).toContain("name is required");
    expect(result?.data?.errors.nested?.email).toContain("email is required");
    expect(result?.data?.errors.nested?.password).toContain("password is required");
  });
});
