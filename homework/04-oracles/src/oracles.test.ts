import { AssertionError } from "assert";
import {
  FLAWED_STABLE_MATCHING_SOLUTION_1,
  FLAWED_STABLE_MATCHING_SOLUTION_1_TRACE,
  STABLE_MATCHING_SOLUTION_1,
  STABLE_MATCHING_SOLUTION_1_TRACE,
} from "../include/stableMatching.js";
import { stableMatchingOracle, stableMatchingRunOracle } from "./oracles.js";

describe("generateInput", () => {
  // Tests for generateInput go here.
});

// Part A
describe("Part A: stableMatchingOracle", () => {
  // You do not need to write more tests. The two provided are sufficient.

  // Given an correct solution, no assertion should fail, and no errors should be thrown
  it("should accept STABLE_MATCHING_SOLUTION_1", () => {
    expect(() => stableMatchingOracle(STABLE_MATCHING_SOLUTION_1)).not.toThrow();
  });

  // Given an incorrect solution, some assertion should fail
  it("should reject FLAWED_STABLE_MATCHING_SOLUTION_1", () => {
    expect(() => stableMatchingOracle(FLAWED_STABLE_MATCHING_SOLUTION_1)).toThrow(AssertionError);
  });
});

// Part B
describe.skip("Part B: stableMatchingRunOracle", () => {
  // You do not need to write more tests than the two provided

  // Given an correct solution, no assertion should fail, and no errors should be thrown
  it("should accept STABLE_MATCHING_SOLUTION_1_TRACE", () => {
    expect(() => stableMatchingRunOracle(STABLE_MATCHING_SOLUTION_1_TRACE)).not.toThrow();
  });

  // Given an incorrect solution, some assertion should fail
  it("should reject FLAWED_STABLE_MATCHING_SOLUTION_1", () => {
    expect(() => stableMatchingRunOracle(FLAWED_STABLE_MATCHING_SOLUTION_1_TRACE)).toThrow(AssertionError);
  });
});
