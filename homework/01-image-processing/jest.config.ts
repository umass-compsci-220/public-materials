import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  testPathIgnorePatterns: ["<rootDir>/out/", "<rootDir>/node_modules/"],
  collectCoverageFrom: ["<rootDir>/src/!(main).ts"],
  coverageReporters: ["json-summary", "text"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 100,
      lines: 80,
      statements: 80,
    },
  },
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};

export default jestConfig;
