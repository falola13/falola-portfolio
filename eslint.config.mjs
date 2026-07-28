import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Flat config. `next lint` was removed in Next 16, so ESLint runs directly and
 * `eslint-config-next` is imported as flat config arrays (v16 ships them
 * natively — no FlatCompat bridge).
 */
const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "tsconfig.tsbuildinfo",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default config;
