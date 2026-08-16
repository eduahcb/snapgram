import { describe, expect, it } from "vitest";

import { usernameNormalized } from "./username-normalized";

describe("usernameNormalized", () => {
  describe("when is only first name", () => {
    it("should return name normalized", () => {
      const username = usernameNormalized("Eduardo");

      expect(username).toBe("eduardo");
    });

    it.each([
      ["Júlia", "julia"],
      ["José", "jose"],
      ["João", "joao"],
      ["André", "andre"],
      ["Luís", "luis"],
      ["Inês", "ines"],
      ["Cátia", "catia"],
      ["Débora", "debora"],
      ["Bárbara", "barbara"],
      ["Simão", "simao"],
      ["Conceição", "conceicao"],
      ["François", "francois"],
      ["Müller", "muller"],
      ["Björk", "bjork"],
      ["Łukasz", "lukasz"],
    ])("should remove remove special characters from %s", (name, expectedName) => {
      const username = usernameNormalized(name);

      expect(username).toBe(expectedName);
    });
  });

  describe("when is compound name", () => {
    it.each([
      ["Júlia Maria", "julia_maria"],
      ["José Carlos", "jose_carlos"],
      ["João Pedro", "joao_pedro"],
      ["Luís Fernando", "luis_fernando"],
      ["Bárbara Müller", "barbara_muller"],
      ["François Dubois", "francois_dubois"],
      ["Renée André", "renee_andre"],
      ["Cátia Björk", "catia_bjork"],
      ["Simão Łukasz", "simao_lukasz"],
    ])("should separate %s by _", (name, expectedName) => {
      const username = usernameNormalized(name);

      expect(username).toBe(expectedName);
    });
  });

  describe("when has more than two names", () => {
    it.each([
      ["Luís Fernando Souza", "luis_souza"],
      ["João Pedro Almeida Costa", "joao_costa"],
      ["Ana Cátia Débora Duarte", "ana_duarte"],
    ])("should keep only first and last name for %s", (name, expectedName) => {
      const username = usernameNormalized(name);

      expect(username).toBe(expectedName);
    });
  });

  describe("when username is the same", () => {
    it("should return username with random suffix", () => {
      const username = usernameNormalized("Eduardo");

      const newUsername = usernameNormalized("Eduardo", username);

      expect(newUsername).toMatch(/^eduardo\d+$/);
    });
  });
});
