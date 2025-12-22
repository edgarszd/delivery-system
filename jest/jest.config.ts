import type { Config } from 'jest';
process.env.TZ = 'UTC';

const TWENTY_SECONDS_OF_TIMEOUT = 20000;

const config: Config = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['**/*.(t|j)s', '!**/test/**'],
  coverageDirectory: '../coverage/unit',
  coveragePathIgnorePatterns: [
    '/src/server.ts',
    '/src/contracts/',
    '/src/__tests__',
    '/src/configurations/dotenv.ts',
    '/src/configurations/env-constants.ts',
  ],
  coverageProvider: 'v8',
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],
  preset: 'ts-jest',
  rootDir: '../src',
  bail: 1,
  testEnvironment: 'node',
  testRegex: '.*\\.unit.test\\.ts$',
  setupFiles: ['../jest/setup-tests.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testTimeout: TWENTY_SECONDS_OF_TIMEOUT,
};

export default config;
