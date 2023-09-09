/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  semi: true,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  endOfLine: "lf",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["<THIRD_PARTY_MODULES>", "", "^@/(.*)$", "^[./]"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};

export default config;
