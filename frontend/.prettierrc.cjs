/** @type {import("prettier").Config} */
module.exports = {
  importOrder: [
    '^@/assets/(.*)$',
    '^@/components/(.*)$',
    '^@/stores/(.*)$',
    '^@/pages/(.*)$',
    '^@/helpers/(.*)$',
    '^(@/.*)',
    '^[./]',
  ],
  importOrderCaseInsensitive: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
  trailingComma: 'all',
  printWidth: 100,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  endOfLine: 'lf',
  singleQuote: true,
  tabWidth: 2,
  semi: false,
}

