import { FLAWED_STABLE_MATCHING_SOLUTION_1, STABLE_MATCHING_SOLUTION_1 } from "../include/stableMatching.js";
import { generateInput } from "./oracles.js";

function debugPrint(prefix: string, x: unknown): void {
  console.log(`${prefix} ${JSON.stringify(x, undefined, 2)}`);
}

const N = 10;
const companies = generateInput(N);
debugPrint("Companies:", companies);
const candidates = generateInput(N);
debugPrint("Candidates:", candidates);

const solution = STABLE_MATCHING_SOLUTION_1(companies, candidates);
debugPrint("Correct Solution:", solution);

const incorrect = FLAWED_STABLE_MATCHING_SOLUTION_1(companies, candidates);
debugPrint("Incorrect Solution:", incorrect);
