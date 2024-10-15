import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { 
      globals: globals.node,
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: "./",
      },
    },
    ignores: ["**/vitest.config.ts"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-useless-constructor": "off",
      "typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/space-before-function-paren": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/quotes": "off",
      "@typescript-eslint/no-misused-new": "off",
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
];
