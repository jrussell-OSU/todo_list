module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  //overrides: [
    //{
      //files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      //extends: [
        //'plugin:@typescript-eslint/recommended',
        //'plugin:@typescript-eslint/recommended-requiring-type-checking',
      //],

      //parserOptions: {
        //project: ['./tsconfig.json'], // Specify it only for TypeScript files
      //},
    //},
  //],
  extends: [
    'plugin:react/recommended',
    // 'standard-with-typescript',
    'airbnb-typescript-prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    camelcase: 'error',
    '@typescript-eslint/no-shadow': ['error'],
    'spaced-comment': 'error',
    'no-duplicate-imports': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
