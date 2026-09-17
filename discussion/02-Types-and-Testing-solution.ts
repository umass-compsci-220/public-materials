// Exercise 1: Type Signatures

/*
Part (a): Fill in the type signatures for f and g.
  
const a = [1,2,3,4];
const b = a.filter(f);
const c = b.map(g);

f(x: number): boolean
g(x: number): T
*/

/*
Part (b): Initialize a, f, and g such that h runs without errors.
The input and output types of f should be different from each other.
You may uncomment the code to test your implementation.
*/

const a = ["apple", "banana", "cherry"];
const f = (s: string): number => s.length;
const g = (n: number): boolean => n > 5;

const h = <T, U>(a: T[], f: (x: T) => U, g: (y: U) => boolean) => a.map(f).filter(g);
h(a, f, g);

// Exercise 2: Testing with Jest

// Write comprehensive tests for rotateRight using Jest (in lab.test.ts).

export function rotateRight<T>(arr: T[], k: number): T[] {
  if (!Number.isInteger(k) || k < 0) {
    throw new Error("k must be a non-negative integer");
  }

  const n = arr.length;
  if (n === 0) return [];

  k = k % n;

  if (k === 0) return arr.slice();

  return arr.slice(-k).concat(arr.slice(0, n - k));
}

// Tests (go in lab.test.ts)

it("should rotate right by 1", () => {
  expect(rotateRight([1, 2, 3, 4], 1)).toEqual([4, 1, 2, 3]);
});

it("should rotate right by 2", () => {
  expect(rotateRight([1, 2, 3, 4], 2)).toEqual([3, 4, 1, 2]);

});

it("should return a copy if k = 0", () => {
  const a = [1, 2, 3];
  const b = rotateRight(a, 0);

  expect(b).toEqual([1, 2, 3]);
  expect(b).not.toBe(a); // should be a new array

});

it("should return a copy if k equals length", () => {
  expect(rotateRight([1, 2, 3, 4], 4)).toEqual([1, 2, 3, 4]);
});

it("should behave like k = k % length if k > length", () => {
  expect(rotateRight([1, 2, 3, 4], 6)).toEqual([3, 4, 1, 2]);
});

it("should handle very large k values", () => {
  expect(rotateRight([1, 2, 3, 4], 100)).toEqual(rotateRight([1, 2, 3, 4], 100 % 4));
});

it("should throw an error if k is negative", () => {
  expect(() => rotateRight([1, 2, 3], -1)).toThrow();
});

it("should throw an error if k is a float", () => {
  expect(() => rotateRight([1, 2, 3], 1.5)).toThrow();
});

it("should throw an error if k is a negative float", () => {
  expect(() => rotateRight([1, 2, 3], -1.5)).toThrow();
});

it("should return an empty array for empty input array", () => {
  expect(rotateRight([], 10)).toEqual([]);
});

it("should handle single element arrays", () => {
  expect(rotateRight([42], 5)).toEqual([42]);
});

it("should work with non-numeric types", () => {
  expect(rotateRight(["a", "b", "c"], 1)).toEqual(["c", "a", "b"]);
});

it("should not mutate the input array", () => {
  const a = [1, 2, 3, 4];

  rotateRight(a, 1);
  expect(a).toEqual([1, 2, 3, 4]);
});
