import { describe, expect, it } from "vitest";

import { hello } from "./index";

describe("test", () => {
  it("should return Hello", () => {
    const result = hello();

    expect(result).toBe("Hello");
  });
});
