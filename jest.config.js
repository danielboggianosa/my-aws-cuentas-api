/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!lib/**", "!node_modules/**"],
  coverageDirectory: "<rootDir>/reports/coverage",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};