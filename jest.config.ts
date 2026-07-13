import type {Config} from 'jest';

const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.test.ts"
  ],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\.ts$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@/(.*)\\.js$": "<rootDir>/src/$1",
    "^@/(.*)$": "<rootDir>/src/$1"
  }

};

export default config;
