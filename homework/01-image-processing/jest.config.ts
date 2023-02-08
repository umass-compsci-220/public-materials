import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig = {
  testPathIgnorePatterns: ["out/*"],
  collectCoverageFrom: ["src/**/!(main).ts"],
  coverageThreshold: {
    "src/**/!(main).ts": {
      branches: 50,
      functions: 100,
      lines: 80,
      statements: 80,
    },
  },
  extensionsToTreatAsEsm: [".ts"],
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
