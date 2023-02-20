# Testing Guidelines

During this course, you are expected, and graded on your ability, to write quality and **[full coverage](#coverage)** unit tests using the testing principles covered in class.

**Your grade will be directly and indirectly affected by how you approach and complete your tests.** Directly, in the sense that your tests will be reviewed for coverage and design. And of course, your grade will be indirectly affected, as students who write more quality tests will likely catch more errors in their program.

Each relevant homework has a set of provided tests for you to work off of; **that is not to say that if you pass all these tests your program is correct.** When you submit your assignment, you will not see a grade. As tests used to evaluate your submission are private. However, the autograder will tell you approximately how many tests you are passing. You will be able to see the results of these tests after the deadline.

## Coverage

From [Wikipedia on Fault Coverage](https://en.wikipedia.org/wiki/Fault_coverage)

> The term **test coverage** used in the context of programming/software engineering, refers to measuring how much a software program has been exercised by tests. Coverage is a means of determining the rigor with which the question underlying the test has been answered.

For relevant homeworks, the auto-grader will calculate how many source lines of code (SLOC) **your tests** reach (more specifically which functions, statements, and branches are covered). There will be an test worth 12% of the overall grade that verifies you meet the requirements below:

- **At least** 50% branch coverage
- **At least** 80% statement coverage
- **At least** 100% function coverage

Achieving these thresholds should not be too difficult. However, partial credit will be awarded in a linear fashion. These thresholds are subject to change as we test this new system.

To calculate your coverage see the [homework testing document](../resources/homework/TESTING.md) (`npm run test:coverage`). Please use this as a general guide for where your tests stand; achieving these thresholds should not be too difficult. Focus on writing quality tests, and greater coverage will naturally follow.

## Design

The design of your tests should follow the patterns demonstrated in the [first homework's provided tests](../homework/01-image-processing/src/imageProcessing.test.ts). Your tests may be manually graded on your ability to follow these practices, and others, as listed below:

- Using `describe` blocks for group-related tests
- Using descriptive and insightful names for `describe`,`it`, and `test` blocks
- Providing context to assertions ("Expected X, but got Y"; unnecessary if using `expect`). This can be done by:
  - Providing a message to assert: `assert(negate(10) === -10, "Given 10, -10 should be returned");`
  - Writing some comments to describe what a tests is trying to accomplish
- Writing reusable testing functions for cleaner code
- Writing atomic tests (do not depend on each other; do not cause any side effects on shared data)
- Writing tests that cover edge cases (weird (but valid) sized/shaped input, input close to a bound, input on a bound, input in the middle, etc.)
