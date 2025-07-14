import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["src/temp/**"],
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/*"],
              message: "Import from '@/components' only (the index file).",
            },
          ],
        },
      ],
    },
  },
  {
    // Allow deep imports only in the index file , internally inside src/components/app
    files: ["src/components/index.ts", "src/components/app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
];
