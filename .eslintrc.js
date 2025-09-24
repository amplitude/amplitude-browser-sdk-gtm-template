module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    
    // General ESLint rules
    'no-console': 'off', // Allow console.log for debugging
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Style rules
    'indent': 'off', // Disabled in favor of TypeScript rule
    '@typescript-eslint/indent': ['error', 2],
    'quotes': 'off', // Disabled in favor of TypeScript rule  
    '@typescript-eslint/quotes': ['error', 'single'],
    'semi': 'off', // Disabled in favor of TypeScript rule
    '@typescript-eslint/semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    
    // Best practices
    'eqeqeq': ['error', 'always'],
    'curly': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
  },
  overrides: [
    {
      // More lenient rules for test files
      files: ['**/*.test.ts', '**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
    {
      // Special rules for GTM template files (they use global variables)
      files: ['src/gtm-polyfill.ts', 'src/gtm-polyfills/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off', // GTM templates often use any
        'no-undef': 'off', // GTM has global variables not defined in TypeScript
      },
      globals: {
        'window': 'readonly',
        'globalThis': 'readonly',
        'module': 'writable',
        'require': 'writable',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/',
    'libs/',
    '*.js',
    '!.eslintrc.js',
  ],
};
