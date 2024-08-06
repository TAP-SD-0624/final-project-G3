import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  // Apply to all .ts files inside the src folder
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Add or modify custom rules here
      semi: ["error", "always"],
      quotes: ["error", "single"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-console": "warn",
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "error",
      "arrow-parens": ["error", "always"],
      "brace-style": ["error", "1tbs"],
      "comma-dangle": ["error", "always-multiline"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "space-before-function-paren": ["error", "never"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-infix-ops": "error",
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
    },
  },
  // Extend recommended rules from TypeScript ESLint
  ...tseslint.configs.recommended,
];
