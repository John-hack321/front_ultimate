import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Add rules you want to disable here
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/display-name': 'off',
      // Add more rules as needed
    },
  },
  {
    // Disable specific rules for test files
    files: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**/*'],
    rules: {
      'testing-library/prefer-screen-queries': 'off',
      'testing-library/render-result-naming-convention': 'off',
      // Add more test-specific rule overrides as needed
    },
  },
];

export default eslintConfig;
