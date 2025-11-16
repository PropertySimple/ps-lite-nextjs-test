// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Storybook build artifacts
    "storybook-static/**",
  ]),
  {
    rules: {
      // Disable unescaped entities rule - marketing copy uses natural language with apostrophes/quotes
      "react/no-unescaped-entities": "off",
      // Warn on unused vars instead of error
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      // Warn on explicit any
      "@typescript-eslint/no-explicit-any": "warn",
      // Turn off page custom font warning (we use app router)
      "@next/next/no-page-custom-font": "off",
    }
  }
]);

export default eslintConfig;
