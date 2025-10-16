// In Class Exercises

/**
 * EXERCISE 1
 *
 * Implement the function makeRepeat that returns an instance of a custom RepeatIterator class.
 * The RepeatIterator class should be an iterable iterator that produces the given value N times.
 * N is assumed to be a non-negative integer.
 */

class RepeatIterator<T> implements IterableIterator<T> {
  private _value: T;
  private _count: number;

  constructor(value: T, count: number) {
    this._value = value;
    this._count = count;
  }

  next(): IteratorResult<T> {
    if (this._count === 0) {
      return { done: true, value: undefined };
    }

    this._count -= 1;
    return { done: false, value: this._value };
  }

  [Symbol.iterator]() {
    return this;
  }
}

export function makeRepeat<T>(value: T, count: number) {
  return new RepeatIterator(value, count);
}

// Try using the iterator produced by makeRepeat below!
// Run the code below after uncommenting it using npm run start

// for (const item of makeRepeat("spam", 3)) {
//     console.log(item);
// }

// for (const item of makeRepeat("spam", 1)) {
//     console.log(item);
// }

// for (const item of makeRepeat("egg", 0)) {
//     console.log(item);
// }

/**
 * EXERCISE 2
 *
 * Write a function that takes in an array of iterables and returns an instance of a custom
 * ChainIterator class. The ChainIterator class should be an iterable iterator that yields
 * items from the first iterable until it runs out. It should then yield items from the next
 * iterable in the given array, repeating this process until reaching the end of the array of
 * iterables.
 *
 * You may assume the given array is not empty.
 *
 */

class ChainIterator<T> implements IterableIterator<T> {
  private _idx: number;
  private _curr_iterator: Iterator<T>;
  private _iterables: Iterable<T>[];

  constructor(iterables: Iterable<T>[]) {
    this._idx = 0;
    this._curr_iterator = iterables[0][Symbol.iterator]();
    this._iterables = iterables.map(x => x); // copying given array, could also use [...iterables]
  }

  next(): IteratorResult<T> {
    let iter_result = this._curr_iterator.next();
    while (iter_result.done) {
      if (++this._idx >= this._iterables.length) return { done: true, value: undefined };
      this._curr_iterator = this._iterables[this._idx][Symbol.iterator]();
      iter_result = this._curr_iterator.next();
    }
    return { done: false, value: iter_result.value };
  }

  [Symbol.iterator]() {
    return this;
  }
}

export function makeChain<T>(iterables: Iterable<T>[]): ChainIterator<T> {
  return new ChainIterator(iterables);
}
