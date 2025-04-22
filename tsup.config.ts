import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts", "src/cli.ts"],
  target: "es2020",
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
});
