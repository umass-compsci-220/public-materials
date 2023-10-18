import { Stream, snode, sempty, from } from "../include/stream.js";

// In Class Exercises

/**
 * EXCERCISE 1
 *
 * Create an infinite stream of non-negative integers that are multiples of 3. Do not use higher-order-functions.
 *
 */

export function every3_1(n: number): Stream<number> {
  return snode(n, () => every3_1(n + 3));
}

function every3_2(n: number): Stream<number> {
  return snode(n * 3, () => every3_2(n + 1));
}

function every3_3(n: number): Stream<number> {
  return from(0, 3);
}

/**
 * EXCERCISE 2
 *
 * Write a function that takes as arguments a stream of numbers and returns a stream of those numbers which are
 * multiples of their predicessor in the original stream.
 *
 */

export function keepMult_1(s: Stream<number>): Stream<number> {
  if (s.isEmpty()) return s;
  function mkStream(s: Stream<number>, prev: number): Stream<number> {
    if (s.isEmpty()) return s;
    const head = s.head();
    if (head % prev === 0) {
      return snode(head, () => mkStream(s.tail(), head));
    }
    return mkStream(s.tail(), head);
  }
  return mkStream(s.tail(), s.head());
}

function keepMult_2(s: Stream<number>): Stream<number> {
  if (s.isEmpty() || s.tail().isEmpty()) return sempty(); // Can you reason about why this code does not crash when s is empty?
  const tail = { val: s.tail().head(), next: s.tail() };
  return tail.val % s.head() === 0 ? snode(tail.val, () => keepMult_2(tail.next)) : keepMult_2(tail.next);
}

function keepMult_3(s: Stream<number>): Stream<number> {
  if (s.isEmpty()) return s;
  let prev = s.head();
  return s.tail().filter(x => {
    const should_include = x % prev === 0;
    prev = x;
    return should_include;
  });
}

/**
 * EXCERCISE 3
 *
 * Write a function that takes two streams (finite or infinite) and returns a single stream which interleaves
 * the values from each of the inputs.
 *
 */

export function interStream<T>(s1: Stream<T>, s2: Stream<T>): Stream<T> {
  return s1.isEmpty() ? s2 : snode(s1.head(), () => interStream(s2, s1.tail()));
}
