module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  // Extending commonly used configurations for React & TypeScript.
  extends: [
    'plugin:react/recommended',
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

  plugins: ['react', '@typescript-eslint', 'react-hooks', 'autofix'],

  rules: {
    // React & JSX
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/prop-types': 'off', // Prop types are not needed with TypeScript
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Imports
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-duplicate-imports': 'error',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-shadow': 'off',
    camelcase: 'error',
    'spaced-comment': 'error',
    'arrow-body-style': ['error', 'as-needed'],

    // Autofix
    'autofix/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: '^_',
      },
    ],
  },

  settings: {
    react: {
      version: 'detect', // Detects the installed React version
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
