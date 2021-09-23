module.exports = {
  semi: true,
  printWidth: 120,
  overrides: [
    {
      files: '**/*.{js,mjs,jsx,ts,tsx}',
      options: {
        parser: 'typescript',
        singleQuote: true,
        arrowParens: 'always',
        trailingComma: 'all',
      },
    },
    {
      files: '**/*.json',
      options: {
        parser: 'json',
        printWidth: 80,
        singleQuote: false,
      },
    },
    {
      files: '**/*.{yml,yaml}',
      options: {
        parser: 'yaml',
        printWidth: 80,
        singleQuote: false,
      },
    },
    {
      files: '**/*.{md}',
      options: {
        parser: 'markdown',
      },
    },
  ],
};
