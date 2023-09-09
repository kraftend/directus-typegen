/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  env: {
    es2022: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
    '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/no-extraneous-dependencies': ['error'],
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json'],
      },
    },
  },
  ignorePatterns: [
    '**/.eslintrc.cjs',
    'dist',
    'pnpm-lock.yaml',
    'node_modules',
  ],
  reportUnusedDisableDirectives: true,
};

module.exports = config;
