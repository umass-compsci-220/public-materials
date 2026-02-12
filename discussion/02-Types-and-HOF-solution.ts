// Reduce Review

type Color = [number, number, number];

// Sample Reduce Implementation
function reduce<T, U>(a: T[], f: (acc: U, e: T) => U, init: U): U {
  let result = init;
  for (let i = 0; i < a.length; ++i) {
    result = f(result, a[i]);
  }
  return result;
}

// Example:

const arr = [3, 2, 6, 2, 2, 0];

const result = reduce(arr, (prod, e) => prod * e, 1);
// Alternatively: arr.reduce((prod, e) => prod * e, 1);

console.log(result);

// In class exercises

// Exercise 1
export function countBlue(arr: Color[]): number {
  const isBlue = (c: Color) => c[2] >= 2 * c[0] && c[2] >= 2 * c[1];
  return arr.reduce((acc, c) => (isBlue(c) ? acc + 1 : acc), 0);
}

export function countBlue2D(arr: Color[][]): number {
  return arr.reduce((acc, r) => acc + countBlue(r), 0);
}

// Exercise 2
export function countIf<T>(a: T[], func: (x: T) => boolean): number {
  return a.reduce((count, elem) => {
    return func(elem) ? count + 1 : count;
  }, 0);
}

export function atLeastHalf<T>(a: T[], func: (x: T) => boolean): boolean {
  return countIf(a, func) >= a.length / 2;
}
