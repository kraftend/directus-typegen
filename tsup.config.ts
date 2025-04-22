import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts", "src/cli.ts"],
  target: "es2020",
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".js" : ".mjs",
    };
  },
});
