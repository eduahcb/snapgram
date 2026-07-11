import antfu from "@antfu/eslint-config";

export default antfu({
  svelte: true,

  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
  ignores: [
    ".github/*",
  ],
  rules: {
    "unicorn/filename-case": ["error", { case: "kebabCase" }],
  },
});
