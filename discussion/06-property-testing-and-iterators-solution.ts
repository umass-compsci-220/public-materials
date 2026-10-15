import assert from "assert";

/**
 *  Exercise 1: Property-Based Testing
 */

function randomPositiveInteger() {
  return Math.floor(Math.random() * 1000 + 1);
}

export function oracle(genArray: (num: number) => number[][]) {
  const num_tests = 5;
  for (let i = 0; i < num_tests; ++i) {
    const n = randomPositiveInteger();
    const a = genArray(n);
    const valid = (x: number) => x % 1 === 0 && 0 <= x && x < n;

    function isPerm(p: number[]) {
      assert(p.length === n, "length is n");
      assert(p.every(valid), "valid numbers");
      const f = Array(n).fill(1);
      assert(p.every(e => --f[e] === 0));
    }

    assert(a.length === n, "array has n rows");
    a.forEach(isPerm); // Each row is a permutation
    for (let k = 0; k < n; ++k) {
      isPerm(a.map(r => r[k])); // Each column is a permutation
    }
  }
}

/**
 * Exercise 2: Iterators
 *
 * Implement AlternatingIterator<T>.
 * Take two iterables and yield their elements alternately, starting with the first.
 * When one iterator is exhausted, continue yielding elements from the other.
 * Finish when both iterators are exhausted.
 * The result should be an iterable iterator, usable with next() and for...of.
 *
 * Example: [1, 2, 3] and [10, 20, 30, 40] yield 1, 10, 2, 20, 3, 30, 40.
 */

export class AlternatingIterator<T> implements IterableIterator<T> {
  private first: Iterator<T>;
  private second: Iterator<T>;
  private useFirst: boolean;

  constructor(a: Iterable<T>, b: Iterable<T>) {
    this.first = a[Symbol.iterator]();
    this.second = b[Symbol.iterator]();
    this.useFirst = true;
  }

  next(): IteratorResult<T> {
    const curr = this.useFirst ? this.first : this.second;
    const other = this.useFirst ? this.second : this.first;

    const result = curr.next();

    if (!result.done) {
      this.useFirst = !this.useFirst;
      return result;
    }

    return other.next();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }
}

// Uncomment either example and run npm run start after copying this solution to src/lab.ts.
// Using next() to inspect individual results:
// const it = new AlternatingIterator([1, 2, 3], [10, 20, 30, 40]);
// console.log(it.next()); // { done: false, value: 1 }
// console.log(it.next()); // { done: false, value: 10 }
// Keep calling next() to get 2, 20, 3, 30, 40, then { done: true, value: undefined }.

// Using for...of to visit every value:
// for (const value of new AlternatingIterator([1, 2, 3], [10, 20, 30, 40])) {
//   console.log(value);
// }
// Expected output: 1, 10, 2, 20, 3, 30, 40.
