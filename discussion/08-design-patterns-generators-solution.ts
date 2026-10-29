// Lab 8 - Design Patterns and Generators

/**
 * EXERCISE 1
 *
 * Discuss the following questions with your group and submit your answers individually
 * to Gradescope.
 *
 * 1. What is a design pattern? Why might we use one?
 *
 * 2. What is the purpose of the Singleton pattern? What are its key characteristics?
 *
 * 3. Describe the nature of interactions between:
 *    - Model and View
 *    - Model and Controller
 *    - View and Controller
 */

/**
 * EXERCISE 2
 *
 * Implement a generator function that takes in two number iterators, each yielding
 * values in non-decreasing order, and merges them into a single non-decreasing sequence.
 *
 * Your solution should:
 *    - Preserve duplicates and return all values from both iterators.
 *    - Handle empty iterators and cases where one iterator finishes before the other.
 *    - Use O(1) space.
 */

export function* mergedGenerator(it1: Iterator<number>, it2: Iterator<number>): Generator<number> {
  let r1 = it1.next();
  let r2 = it2.next();

  while (!r1.done || !r2.done) {
    if (r1.done) {
      yield r2.value;
      r2 = it2.next();
    } else if (r2.done) {
      yield r1.value;
      r1 = it1.next();
    } else if (r1.value <= r2.value) {
      yield r1.value;
      r1 = it1.next();
    } else {
      yield r2.value;
      r2 = it2.next();
    }
  }
}
