/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  roots: ['<rootDir>/src', '<rootDir>/test'], // Updated to point to your test directory
  testMatch: ['**/test/**/*.test.ts'], // Updated pattern for your test directory
  moduleFileExtensions: ['ts', 'js', 'json'],
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    // 'src/config',
    // 'src/app.js',
    'test', // Make sure this matches your test directory name
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
