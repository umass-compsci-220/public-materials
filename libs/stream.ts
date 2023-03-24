// Readonly<T> will compose a type that has all fields of T, but is readonly.
// Attempting to write (do an assignment) to any field will produce a compile-time error.

/**
 * The exposed (exported) list interface.
 */
export type Stream<T> = Readonly<_Stream<T>>;

/**
 * The internal stream (immutable, possibly infinite list) interface, with higher-order functions.
 */
interface _Stream<T> {
  head: () => T;
  tail: () => Stream<T>;
  isEmpty: () => boolean;
  toString: () => string;
  map: <U>(f: (x: T) => U) => Stream<U>;
  filter: (f: (x: T) => boolean) => Stream<T>;
}

/**
 * The Memoized function interface.
 */
interface Memoized<T> {
  get: () => T;
  toString: () => string;
}

/**
 * Memoizes a provided function
 * @param f A zero-parameter function (thunk)
 * @returns A memoized version of @param f
 */
function memo<T>(f: () => T): Memoized<T> {
  let evaluated = false;
  let value: T;
  return {
    get: () => {
      if (!evaluated) {
        value = f();
        evaluated = true;
      }

      return value;
    },
    toString: () => (evaluated ? "<unevaluated>" : String(value)),
  };
}

/**
 * Stream node constructor
 * @param head The value of the new stream node
 * @param tail The memoized tail of the stream node
 * @returns A new stream node
 */
export function snode<T>(head: T, tail: () => Stream<T>): Stream<T> {
  const memoizedTail = memo(tail);

  return {
    isEmpty: () => false,
    head: () => head,
    tail: memoizedTail.get,
    toString: () => `snode(${head}, ${tail.toString()})`,
    map: f => snode(f(head), () => memoizedTail.get().map(f)),
    filter: pred => (pred(head) ? snode(head, () => memoizedTail.get().filter(pred)) : memoizedTail.get().filter(pred)),
  };
}

/**
 * The empty stream node constructor
 * @returns An empty stream node
 */
export function sempty<T>(): Stream<T> {
  return {
    head: () => {
      throw new Error();
    },
    tail: () => {
      throw new Error();
    },
    isEmpty: () => true,
    toString: () => "sempty",
    map: () => sempty(),
    filter: () => sempty(),
  };
}

/**
 * Constructs an infinite stream of numbers
 * @param n A number
 * @param delta A number representing the jump size, defaults to 1
 * @returns A stream of numbers starting from `n`
 */
export function from(start: number, delta = 1): Stream<number> {
  return snode(start, () => from(start + delta, delta));
}
