/* eslint-disable no-undef */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.*\\.(integration-|e2e-)?test\\.ts$',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/mocks.ts',
    '!src/setup-app.ts',
    '!src/**/index.ts',
    '!src/**/*.(builder|config|error|interface|mock|module|dto|request-dto).ts',
  ],
};