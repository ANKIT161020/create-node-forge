// .eslintrc.cjs
// ESLint configuration for code quality and consistency
module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
    jest: true, // Enable Jest globals for test files
  },
  extends: [
    'eslint:recommended',
    'airbnb-base', // Extends Airbnb's base JavaScript rules
    'plugin:@typescript-eslint/recommended', // Recommended rules for TypeScript
    'plugin:prettier/recommended', // Integrates Prettier with ESLint, disable conflicting rules
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json', // Path to your tsconfig.json for type-aware linting
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'import', // Required by airbnb-base
  ],
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier rules as ESLint errors

    // --- Airbnb overrides for TypeScript compatibility and common Node.js patterns ---
    'import/extensions': [
      // Allow omission of extensions for .ts and .tsx
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off', // Allow named exports without default
    'import/no-unresolved': 'off', // Handled by TypeScript compiler, conflicts with absolute paths
    'import/no-extraneous-dependencies': 'off', // Disable for monorepos or when devDependencies are imported in src

    'no-shadow': 'off', // Disable base rule, as it conflicts with TypeScript enums/types
    '@typescript-eslint/no-shadow': ['error'], // Enable TS-specific no-shadow

    'class-methods-use-this': 'off', // Often too strict for service/repository classes

    'no-useless-constructor': 'off', // Disable base rule
    '@typescript-eslint/no-useless-constructor': ['error'], // Enable TS-specific no-useless-constructor

    'no-empty-function': 'off', // Disable base rule
    '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }], // Allow empty constructors

    'func-names': ['error', 'as-needed', { generators: 'as-needed' }], // Default Airbnb, but we'll use overrides

    'no-underscore-dangle': ['error', { allow: ['_id', '__v'] }], // Allow Mongoose's _id and __v

    'no-return-await': 'off', // Disable base rule (Airbnb's default is often 'error')

    'consistent-return': 'off', // Disable this rule as it often conflicts with Express middleware patterns (calling next() or sending response)

    'no-console': ['warn', { allow: ['warn', 'error', 'info', 'debug'] }], // Allow specific console methods

    // --- Fix for 'no-use-before-define' error ---
    // Disable the base ESLint rule
    'no-use-before-define': 'off',
    // Enable the TypeScript-specific rule, allowing functions and classes to be used before definition
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: true },
    ],

    // --- Existing rules (adjust as needed) ---
    '@typescript-eslint/no-explicit-any': 'warn', // Warn on `any`, but allow it when necessary (can be 'error')
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_', // Ignore unused variables that start with _
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        // This helps import plugin resolve absolute paths
        alwaysTryTypes: true,
        project: './tsconfig.json', // Path to your tsconfig.json
      },
    },
  },
  overrides: [
    {
      // Override for Mongoose functions that require 'function' keyword for 'this' context
      files: ['src/models/*.ts'], // Apply to all files in src/models
      rules: {
        'func-names': 'off', // Turn off func-names for Mongoose model files
      },
    },
  ],
  ignorePatterns: ['dist/', 'node_modules/'],
};
