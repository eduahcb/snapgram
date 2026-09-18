import type { EmailSender } from "$lib/server/email/sender";
import { describe, expect, it, vi } from "vitest";

import { createEmailService } from "./email-service";

vi.mock("$lib/server/email/create-email-html", () => ({
  createHtml: vi.fn().mockResolvedValue("<p>rendered</p>"),
}));

function createFakeSender() {
  return {
    send: vi.fn().mockResolvedValue(undefined),
  } satisfies EmailSender;
}

describe("email-service", () => {
  describe("sendVerification", () => {
    it("should send the rendered html with the otp in the subject", async () => {
      const sender = createFakeSender();
      const emailService = createEmailService(sender);

      await emailService.sendVerification("user@test.com", "123456");

      expect(sender.send).toHaveBeenCalledWith({
        to: "user@test.com",
        subject: "Your verification code: 123456",
        html: "<p>rendered</p>",
      });
    });

    it("should propagate errors from the sender", async () => {
      const sender = createFakeSender();
      sender.send.mockRejectedValueOnce(new Error("smtp down"));

      const emailService = createEmailService(sender);

      await expect(
        emailService.sendVerification("user@test.com", "123456"),
      ).rejects.toThrow("smtp down");
    });
  });
});
