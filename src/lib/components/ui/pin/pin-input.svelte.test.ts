import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { page, userEvent } from "vitest/browser";

import PinInput from "./pin-input.svelte";

async function simulateCopy(value: string) {
  const source = document.createElement("input");
  document.body.appendChild(source);
  source.value = value;

  source.focus();
  source.select();

  await userEvent.copy();

  source.remove();
}

describe("pin-input", () => {
  describe("on initial render", () => {
    it("should render default digits", async () => {
      render(PinInput);

      const inputs = page.getByRole("textbox");

      await expect.element(inputs).toHaveLength(6);
    });

    it("should render correctly maxLength digits", async () => {
      render(PinInput, {
        name: "code",
        maxLength: 3,
      });

      const inputs = page.getByRole("textbox");

      await expect.element(inputs).toHaveLength(3);
    });

    it("should render correctly ariaLabel", async () => {
      render(PinInput, {
        name: "code",
        maxLength: 3,
      });

      const group = page.getByRole("group", {
        name: "Verification code",
      });

      await expect.element(group).toBeVisible();
    });

    it("should have correctly name", async () => {
      render(PinInput, {
        name: "code",
      });

      const name = page.getByTestId("pin-value");

      await expect.element(name).toBeInTheDocument();
    });
  });

  describe("on typing", () => {
    it("should focus to next input", async () => {
      render(PinInput);

      const firstInput = page.getByRole("textbox").first();

      await firstInput.fill("1");

      const secondInput = page.getByRole("textbox").nth(1);

      await expect.element(secondInput).toHaveFocus();
    });

    it("should keep focus on last input", async () => {
      render(PinInput);

      const lastInput = page.getByRole("textbox").last();

      await lastInput.fill("6");

      await expect.element(lastInput).toHaveFocus();
    });

    it("should move to next input on press key ArrowRight", async () => {
      render(PinInput);

      const firstInput = page.getByRole("textbox").first();
      await firstInput.click();
      await userEvent.keyboard("{ArrowRight}");

      const secondInput = page.getByRole("textbox").nth(1);
      await expect.element(secondInput).toHaveFocus();
    });

    it("should move to previous input on press key ArrowLeft", async () => {
      render(PinInput);

      const secondInput = page.getByRole("textbox").nth(1);
      await secondInput.click();
      await userEvent.keyboard("{ArrowLeft}");

      const firstInput = page.getByRole("textbox").first();
      await expect.element(firstInput).toHaveFocus();
    });

    it("should keep first input focus on press key ArrowLeft", async () => {
      render(PinInput);

      const firstInput = page.getByRole("textbox").first();
      await firstInput.click();
      await userEvent.keyboard("{ArrowLeft}");

      await expect.element(firstInput).toHaveFocus();
    });

    it("should keep last input focus on press key ArrowRight", async () => {
      render(PinInput);

      const lastInput = page.getByRole("textbox").last();
      await lastInput.click();
      await userEvent.keyboard("{ArrowRight}");

      await expect.element(lastInput).toHaveFocus();
    });

    it("should delete and move to the previous input on press key Backspace ", async () => {
      render(PinInput);

      const firstInput = page.getByRole("textbox").first();
      await firstInput.fill("1");

      const secondInput = page.getByRole("textbox").nth(1);
      await userEvent.keyboard("{Backspace}");

      await expect.element(secondInput).not.toHaveFocus();
      await expect.element(firstInput).toHaveFocus();
    });

    it("should keep first input on focus on press key Backspace", async () => {
      render(PinInput);

      const firstInput = page.getByRole("textbox").first();

      await firstInput.click();
      await userEvent.keyboard("{Backspace}");

      await expect.element(firstInput).toHaveFocus();
    });
  });

  describe("on paste", () => {
    it("should fill all inputs with code", async () => {
      render(PinInput);

      await simulateCopy("123456");

      const firstInput = page.getByRole("textbox").first();
      await firstInput.click();

      await userEvent.paste();

      await expect.element(page.getByRole("textbox").nth(0)).toHaveValue("1");
      await expect.element(page.getByRole("textbox").nth(1)).toHaveValue("2");
      await expect.element(page.getByRole("textbox").nth(2)).toHaveValue("3");
      await expect.element(page.getByRole("textbox").nth(3)).toHaveValue("4");
      await expect.element(page.getByRole("textbox").nth(4)).toHaveValue("5");
      await expect.element(page.getByRole("textbox").nth(5)).toHaveValue("6");
    });
  });
});
