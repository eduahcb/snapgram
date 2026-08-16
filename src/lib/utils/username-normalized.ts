import { slugify } from "transliteration";

function randomSuffix() {
  return Math.floor(Math.random() * 1_000_000).toString();
}

export function usernameNormalized(name: string, existingUsername?: string) {
  let normalized: string;
  const splittedName = name.split(" ");

  if (splittedName.length > 2) {
    normalized = slugify(`${splittedName.shift()} ${splittedName.pop()}`, {
      separator: "_",
    });
  }
  else {
    normalized = slugify(name, {
      separator: "_",
    });
  }

  if (existingUsername && existingUsername === normalized) {
    return `${normalized}${randomSuffix()}`;
  }

  return normalized;
}
