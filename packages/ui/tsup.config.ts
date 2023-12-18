import type { Options } from "tsup";
import { defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/**/*.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  external: ["react"],
  banner: {
    js: '"use client"',
  },
  ...options,
}));
