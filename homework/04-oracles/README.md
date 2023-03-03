# Oracles

- Please download the project [here](./04-oracles.zip).
- This project is divided into two homeworks (HW4a, HW4b)
  - Both carry the weight of a full homework

## Overview

In this assignment, you will develop an _oracle_ to test (possibly broken) solutions to the _Stable Matching Problem_. This assignment is different in that:

- Your purpose is not to solve the problem, but to test whether a solution given to you is correct. That is, all code you write will be tests and supporting code for tests.
- There might be multiple correct outputs for a single input. Thus, you will need to test _properties_ of the output, and make sure you are considering enough properties so anything that satisfies all of them (i.e. passes all your assertions) is correct.

This homework is divided into two assignments (with separate due dates). You will have one week to complete each part. Part one will focus on writing a function that, if given valid inputs, produces correct outputs. Part two will be similar, but will focus on verifying that the steps of a function are correct.

### Learning Objectives

- Practice writing property based tests
- Practice reading, and reasoning about, a problem's specification

### Student Expectations

Students will be graded on their ability to:
- Correctly implement the functions [specified below](#programming-tasks)
  - Using **public** auto-grader tests
  - **There are no private autograder tests**
- Resolve all linter warnings
  - **There will be credited grading for this (2.5%)**
  - See the section on [linting and formatting assignments](../../resources/homework/EDITING.md#linting-and-formatting-assignments) for more details
- Follow the [coding](../../guidelines/CODING.md), [bad practice](../../guidelines/BAD_PRACTICES.md) and [testing](../../guidelines/TESTING.md) guidelines
  - **There may be manual grading regarding these guidelines**

**You are not required to write anything inside of the `.test.ts` file.**

### Resources

- Please use the [resources document](../../resources/README.md) if you are stuck
- Additionally, there is an [examples](#examples) section that goes through input and output

## Getting Started

In basic terms, **an oracle is a function that answers a yes or no question**. In your case, **you are writing an oracle to decide if the supplied function correctly solves the [_Stable Matching Problem_](#the-stable-matching-problem)**.

**Your oracle’s job is to generate and feed test inputs to a given "solution" (possibly incorrect) then test the correctness of the output.** In the past, you did this by comparing the output to a precomputed "right answer". This assumes two things: there is only one right answer, and that it is easy for you to find it.

In the real world, either of these can be false. (How do you know what the right answer to an arbitrary instance of the problem is if the original problem was to write a program to find it?)

**You should write code that is well structured, readable, and employs the right abstractions (higher-order functions/objects).** This will make it easier to test and debug. **Avoid code duplication**, which makes it tedious to inspect and maintain your code when changes are needed.

### The Stable Matching Problem

You can learn more about the Stable Matching Problem from [Wikipedia](https://en.wikipedia.org/wiki/Stable_marriage_problem), but a summary of the problem is as follows:

Imagine there are two groups, $A$ and $B$, both with $n$ members. We need to split the two groups into pairs (called a **matching**) consisting of one member from each group.

More formally, we need a **perfect matching** where every member in group $A$ is paired with _exactly one_ member from group $B$, and vice versa (everyone is in a pair).

However, **everyone has a preference** with who they are matched with. Every member from each group ranks all members from the other group by preference.

A solution to the stable matching problem will take as input the two groups and everyone's preference. As output, it will produce a **stable matching**. A matching is **stable** if there does not exist two matched pairs, $[a_1, b_1]$ and $[a_2, b_2]$, such that:

- $a_1$ prefers $b_2$ over $b_1$, and
- $b_2$ prefers $a_1$ over $a_2$

Alternatively, a matching is not stable (**unstable**) if there exists members $a$ and $b$ who are not paired with each other, but prefer each other over their current pair.

### Companies and Candidates

For this assignment, our groups will consist of **companies** and **candidates**. Each company has a ranking of all candidates, in order of preference. And each candidate has a ranking of all companies. Preference lists will be represented as arrays, with the first preference at index $0$ and the last preference at index $n - 1$.

Companies and candidates are each assigned a number between 0 and $n - 1$. Thus, a two-dimensional array can represent the preferences of a single group:

```ts
// n = 3 = There are three companies. = There are three candidates.
[
  [0, 1, 2], // Index 0: Company 0's preference list
  [1, 2, 0], // Index 1: Company 1's preference list
  [0, 2, 1], // Index 2: Company 2's preference list
];
```

Each element of this 2D array is a preference list. Each element of a preference list is a candidate's number. Company 0's first preference is Candidate 0, then Candidate 1, then lastly Candidate 2. Candidate preference lists are structured the same way. However, each number corresponds to a company rather than a candidate.

Inside of [`stableMatching.d.ts`](./include/stableMatching.d.ts), you will find the following type definitions:

```ts
interface Hire {
  company: number;
  candidate: number;
}

export type StableMatcher = (companies: number[][], candidates: number[][]) => Hire[];
```

A `Hire` is an object with two fields that represents a matching between a company and candidate. A `StableMatcher` is a function that takes in two 2D arrays of numbers, specifically the preferences of the companies and candidates, and returns an array of `Hire` objects (`Hire[]`).

Along with these type definitions, there are two relevant exported members (functions), both of type `StableMatcher`. They are: `STABLE_MATCHING_SOLUTION_1` and `FLAWED_STABLE_MATCHING_SOLUTION_1`. They are used inside the provided tests ([`oracle.test.ts`](./src/oracle.test.ts)) to check against your solution.

Their implementations are [obfuscated](https://en.wikipedia.org/wiki/Obfuscation) inside of [`stableMatching.js`](./include/stableMatching.js). Looking at their source code would be counter-productive to the assignment and not particularly useful. As the auto-grader will tests your oracle against numerous correct and incorrect solutions to the problem.

## Programming Tasks

### Part A

1. Write a function with the following signature:

```ts
generateInput(n: number): number[][]
```

This function should produce an $n \times n$ array of preferences for companies or candidates. This will be used as input for testing a given solution. Your function should generate **random values** in order to test a given solution with a broad spectrum of input.

Constructing a function to complete this is non-trivial. Provided below is a description of the Fisher-Yates shuffling algorithm.

```txt
-- To shuffle an array a of n elements (indices 0..n-1):
for i from n−1 down to 1 do
     j ← random integer such that 0 ≤ j ≤ i
     exchange a[j] and a[i]
```

An function that returns a random number between some range can be done using `Math.random` and `Math.floor`:

```ts
// Returns a random int i where min <= i < max
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}
```

2. Implement `stableMatchingOracle` inside of [`oracles.ts`](./src/oracles.ts).

```ts
export function stableMatchingOracle(f: (companies: number[][], candidates: number[][]) => Hire[]): void;
```

This function is an oracle for the Stable Matching Problem. If `f` is a valid solution of the stable matching problem, it should do nothing (the return type is `void`). If `f` is an invalid solution, it should throw an `AssertionError` (use `assert(...)`).

A template for the `stableMatchingOracle` function is given inside of [`oracles.ts`](./src/oracles.ts). To do well, you should carefully consider all the different ways in which the output could be invalid for the original problem statement. You may assume the output is of the right type, `Hire[]`, but nothing else.

As mentioned in the [student expectations](#student-expectations), you should be employing proper coding abstractions. When implementing this function, look at all the related data a company or candidate has. What are the common operations and queries that you might do on this data? Is there any way to group this together or pre-compute anything? Using object may be helpful. Think before you code. 

### Part B

Now write an oracle that determines if a function follows the specified algorithm:

**Algorithm**: We assume the following non-standard variant: At any step, any unmatched company or candidate may propose. Every party always proposes to the next potential partner on their preference list, starting with the top choice. Proposals are not repeated. Any unmatched party that receives a proposal accepts unconditionally. If the receiving party is already matched, but they receive a better offer (higher in their preference list), they accept, and their current partner becomes unmatched; otherwise, the offer is rejected. The algorithm ends when all parties are either matched or have made offers to the entire preference list. The algorithm is under-specified/nondeterministic: it doesn’t state whether a company or a candidate proposes at a given step, nor which one does, as long as the given rules are observed.

You may have noticed the other members inside [`stableMatching.d.ts`](./include/stableMatching.d.ts):

```ts
interface Offer {
  from: number;
  to: number;
  fromCo: boolean; // If the offer is from a company
}

interface Run {
  trace: Offer[];
  out: Hire[];
}

export type StableMatcherWithTrace = (companies: number[][], candidates: number[][]) => Run;
```

An `Offer` is an object with three fields that represents a proposal from one party member to a member of another party (company -> candidate or candidate -> company). A `Run` is an object that represents the series of steps an algorithm took (`trace`) to produce a solution (`out`). A `StableMatcherWithTrace` is just like a `StableMatcher`, but it returns a `Run`.

1. Implement `stableMatchingRunOracle` inside of [`oracles.ts`](./src/oracles.ts).

```ts
stableMatchingRunOracle(f: (companies: number[][], candidates: number[][]) => Run): void
```

This function should test the provided implementation of stable matching. It should check that:

- The offer sequence in the trace is valid, made according to the given algorithm, starting with all parties unmatched
  - The trace need not be a complete algorithm run, it may stop at any point
- The produced matching (`out`) is indeed the result of the offers in the trace

As with part 1, do nothing if it is valid. Throw an `AssertionError` if it is invalid (use `assert(...)`). You may assume the output is of the right type, `Run`, but nothing else.

Additionally, you should update [`oracle.test.ts`](./src/oracle.test.ts) to skip the tests from part 1 and not skip the part 2 tests.

```ts
// Before
describe("Part A: stableMatchingOracle", () => {
  /* ... */
});

describe.skip("Part B: stableMatchingRunOracle", () => {
  /* ... */
});

// After
describe.skip("Part A: stableMatchingOracle", () => {
  /* ... */
});

describe("Part B: stableMatchingRunOracle", () => {
  /* ... */
});
```

## Examples

Assume that we have candidates Alice, Bob, and Charles, and companies Amazon, Boeing, and Cisco. The candidate preference matrix could look like this:

|                 | First Preference | Second Preference | Third Preference |
| --------------- | ---------------- | ----------------- | ---------------- |
| **Alice (0)**   | 0 (Amazon)       | 1 (Boeing)        | 2 (Cisco)        |
| **Bob (1)**     | 0 (Amazon)       | 2 (Cisco)         | 1 (Boeing)       |
| **Charles (2)** | 2 (Cisco)        | 1 (Boeing)        | 0 (Amazon)       |

This means that Alice’s preferences are Amazon, Boeing, and Cisco, in that order. Bob’s preferences are Amazon, Cisco, and Boeing, in that order. Charles’ preferences are Cisco, Boeing, and Amazon, in that order. The corresponding `number[][]` would look like this:

```ts
[
  [0, 1, 2],
  [0, 2, 1],
  [2, 1, 0],
];
```

The company preference matrix could look like this:

|                | First Preference | Second Preference | Third Preference |
| -------------- | ---------------- | ----------------- | ---------------- |
| **Amazon (0)** | 0 (Alice)        | 2 (Charles)       | 1 (Bob)          |
| **Boeing (1)** | 0 (Alice)        | 1 (Bob)           | 2 (Charles)      |
| **Cisco (2)**  | 0 (Alice)        | 2 (Charles)       | 1 (Bob)          |

This means that Amazon’s preferences are Alice, Charles, and Bob, in that order. Boeing's preferences are Alice Bob, and Charles, in that order. Cisco preferences are Alice, Charles, and Bob, in that order. The corresponding `number[][]` would look like this:

```ts
[
  [0, 2, 1],
  [0, 1, 2],
  [0, 2, 1],
];
```

A possible trace could look like this: `[{from:1, to:1, fromCo:false}]`. This means that Bob makes an offer to Boeing. This offer is invalid, since Bob’s top choice is Amazon, and Bob did not previously offer to Acme in this run.

Another possible trace could be `[{from:2, to:0, fromCo:true}]`. This means that Cisco makes an offer to Alice. This is a valid offer, since Cisco’s top choice is Alice, and Cisco is unmatched. Alice’s top choice is Amazon, but being unmatched, they has to accept the offer. The result is that Alice and Cisco are now marked as matched. If later in the run Alice receives an offer from Amazon, Alice accepts and is matched to Amazon, and Cisco becomes unmatched.

Here is a longer trace:

```ts
[
  // Cisco -> Alice (accept - Alice is unmatched, both become matched)
  { from: 2, to: 0, fromCo: true },
  // Amazon -> Alice (accept - Alice prefers Amazon over their current match, both become matched, Cisco becomes unmatched)
  { from: 0, to: 0, fromCo: true },
  // Cisco -> Charles (accept - Charles is unmatched, both become matched)
  { from: 2, to: 2, fromCo: true },
];
```

This is a valid run. A valid resulting `Hire` array would be:

```ts
[
  { company: 0, candidate: 0 }, // Amazon and Alice
  { company: 2, candidate: 2 }, // Cisco and Charles
];
```

As those are the results of the trace.
