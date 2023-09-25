/**
 * The internal immutable list interface, with higher-order functions.
 */
interface _List<T> {
  head: () => T;
  tail: () => List<T>;
  isEmpty: () => boolean;
  toString: () => string;
  map: <U>(f: (elem: T) => U) => List<U>;
  filter: (pred: (elem: T) => boolean) => List<T>;
  reduce: <U>(f: (acc: U, elem: T) => U, init: U) => U;
  foldRight: <U>(f: (acc: U, elem: T) => U, init: U) => U;
}

/**
 * The exposed (exported) list interface.
 */
export type List<T> = Readonly<_List<T>>;
// Readonly<T> will compose a type that has all fields of T, but is readonly.
// Attempting to write (do an assignment) to any field will produce a compile-time error.

/**
 * The list node constructor
 * @param data The data of the list node
 * @param next The proceeding node in the list
 * @returns A new list node
 */
export function node<T>(data: T, next: List<T>): List<T> {
  function listFoldRight<U>(f: (acc: U, elem: T) => U, init: U): U {
    const acc = next.foldRight(f, init);

    return f(acc, data);
  }

  return {
    head: () => data,
    tail: () => next,
    isEmpty: () => false,
    toString: () => `node(${data}, ${next.toString()})`,
    map: f => {
      return node(f(data), next.map(f));
    },
    filter: f => f(data) ? node(data, next.filter(f)) : next.filter(f),
    reduce: (f, init) => next.reduce(f, f(init, data)),
    foldRight: (f, init) => listFoldRight(f, init),
  };
}

/**
 * The empty list node constructor
 * @returns An empty list node
 */
export function empty<T>(): List<T> {
  return {
    head: () => {
      throw new Error();
    },
    tail: () => {
      throw new Error();
    },
    isEmpty: () => true,
    toString: () => "empty",
    map: () => empty(),
    filter: () => empty(),
    reduce: (_, init) => init,
    foldRight: (_, init) => init,
  };
}

/**
 * Converts a given array into a list
 * @param arr An array
 * @returns A list with each element of `arr`, in order
 */
export function arrayToList<T>(arr: T[]): List<T> {
  const reducer = (lst: List<T>, x: T) => node(x, lst);
  return arr.reduceRight(reducer, empty<T>());
}

/**
 * Converts a given list into an array
 * @param lst A list
 * @returns An array with each element of `lst`, in order
 */
export function listToArray<T>(lst: List<T>): T[] {
  return lst.reduce((acc, elem) => {
    acc.push(elem);
    return acc;
  }, [] as T[]);
}

/**
 * Returns a new list in reverse order
 * @param lst A list
 * @returns A new list that is the reversal of `lst`
 */
export function reverseList<T>(lst: List<T>): List<T> {
  function rev2(lst: List<T>, acc: List<T>): List<T> {
    return lst.isEmpty() ? acc : rev2(lst.tail(), node(lst.head(), acc));
  }
  return rev2(lst, empty());
}
