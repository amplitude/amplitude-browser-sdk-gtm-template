module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.spec.ts', '<rootDir>/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    'copyFromWindow': '<rootDir>/src/gtm-polyfills/copy-from-window.ts',
    'getType': '<rootDir>/src/gtm-polyfills/get-type.ts',
    'Object': '<rootDir>/src/gtm-polyfills/object.ts',
    'injectScript': '<rootDir>/src/gtm-polyfills/inject-script.ts',
    'logToConsole': '<rootDir>/src/gtm-polyfills/log-to-console.ts',
    'makeNumber': '<rootDir>/src/gtm-polyfills/make-number.ts',
    'makeString': '<rootDir>/src/gtm-polyfills/make-string.ts',
    'makeTableMap': '<rootDir>/src/gtm-polyfills/make-table-map.ts',
    'JSON': '<rootDir>/src/gtm-polyfills/json.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
    }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'libs/**/*.{ts,tsx,js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 83,
      functions: 100,
      lines: 100,
    }
  },
  extensionsToTreatAsEsm: ['.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))',
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
