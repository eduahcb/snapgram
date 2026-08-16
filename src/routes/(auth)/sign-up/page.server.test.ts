import type { Auth } from "$lib/server/auth/client";

import type { DB } from "$lib/server/db/client";
import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { createAuth } from "$lib/server/auth/client";
import { createDatabase } from "$lib/server/db/client";
import { createTestDb } from "$lib/utils/create-test-db";
import { truncateAll } from "$lib/utils/truncate-test-db";
import { usernameNormalized } from "$lib/utils/username-normalized";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { actions } from "./+page.server";

type ActionEvent = Parameters<typeof actions.default>[0];

async function createUser(auth: Auth, user: any) {
  await auth.api.signUpEmail({
    body: {
      ...user,
      username: usernameNormalized(user.name),
    },
  });
}

describe("sign up - Form Actions", () => {
  let database: DB;
  let auth: Auth;
  let container: StartedPostgreSqlContainer;

  beforeAll(async () => {
    container = await createTestDb();
    database = createDatabase(container.getConnectionUri());
    auth = createAuth(database, "http://localhost:5173");
  }, 30000);

  afterEach(async () => {
    await truncateAll(database);
  });

  afterAll(async () => {
    await truncateAll(database);
    await database.$client.end();
    await container.stop();
  });

  it("should return success request", async () => {
    const form = new FormData();

    form.append("name", "Eduardo Barbosa");
    form.append("email", "edu@test.com");
    form.append("password", "1da2d2ad2ad2a1");

    const request = new Request("http://localhost/(auth)/sign-up", {
      method: "POST",
      body: form,
    });

    await expect(actions.default({
      request,
      locals: {
        auth,
      },
    } as ActionEvent)).rejects.toMatchObject({
      status: 303,
      location: "/auth/verification",
    });
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

  describe("when the username already exists", () => {
    it("should create username with random suffix", async () => {
      const form = new FormData();

      form.append("name", "Michael Jackson");
      form.append("email", "mj@test.com");
      form.append("password", "1da2d2ad2ad2a1");

      await createUser(auth, {
        name: form.get("name"),
        email: "m_jackson@test.com",
        password: form.get("password"),
      });

      const request = new Request("http://localhost/(auth)/sign-up", {
        method: "POST",
        body: form,
      });

      await expect(actions.default({
        request,
        locals: {
          auth,
        },
      } as ActionEvent)).rejects.toMatchObject({
        status: 303,
        location: "/auth/verification",
      });
    });
  });

  describe("when the email already exists", () => {
    it("should return failed to create user", async () => {
      await createUser(auth, {
        name: "Existing User",
        email: "taken@test.com",
        password: "1da2d2ad2ad2a1",
      });

      const form = new FormData();

      form.append("name", "Eduardo Barbosa");
      form.append("email", "taken@test.com");
      form.append("password", "1da2d2ad2ad2a1");

      const request = new Request("http://localhost/(auth)/sign-up", {
        method: "POST",
        body: form,
      });

      const result = await actions.default({
        request,
        locals: {
          auth,
        },
      } as ActionEvent);

      expect(result?.status).toBe(422);
      expect(result?.data?.errors.root).toEqual(["User already exists. Use another email."]);
    });
  });

  describe("when an unexpected error occurs", () => {
    it("should return a generic error", async () => {
      const brokenAuth = {
        api: {
          signUpEmail: async () => {
            throw new Error("connection lost");
          },
        },
      } as unknown as Auth;

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
        locals: {
          auth: brokenAuth,
        },
      } as ActionEvent);

      expect(result?.status).toBe(500);
      expect(result?.data?.errors.root).toEqual(["unexpected error"]);
    });
  });
});
