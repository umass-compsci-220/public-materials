import { List, node, empty } from "../include/lists.js";

// Using lists examples

// First, lets create the list 1 -> 2 -> 3 -> empty
const threeList = node(1, node(2, node(3, empty())));

// Now, lets print these out.
console.log(threeList.head()); // Prints 1
console.log(threeList.tail().head()); // Prints 2
console.log(threeList.tail().tail().head()); // Prints 3
// console.log(threeList.tail().tail().tail().head()); This fails because the empty node has no head.

// Next lets write a function that will create a List of n nodes starting at n and decreasing to 1.
function decrByOne(n: number): List<number> {
  if (n === 0) {
    return empty();
  }
  return node(n, decrByOne(n - 1));
}

const tenToOne = decrByOne(10);

// Finally we'll write a function that converts a list to a string
function listToString<T>(lst: List<T>): string {
  if (lst.isEmpty()) {
    // We always need to check if a list is empty when working recursively with lists
    return "empty";
  } else {
    return `${lst.head()} -> ${listToString(lst.tail())}`;
  }
}

console.log(listToString(tenToOne));

// TS allows us destructure arrays:
let a, b, rest;
[a, b] = [1, 2];

console.log(a);
console.log(b);

// What does ... do?
const c = [1, 2, 3];
const d = [4, 5, 6];
const e = [...c, ...d];

console.log(e);

[a, b, ...rest] = ["a", "b", "c", "d", "e"];

console.log(a);
console.log(b);
console.log(rest);

// In Class Exercises

// Exercise 1
export function approxE(): () => number {
  let n = 1,
    factorial = 1,
    res = 1;
  // can you shorten this even further?
  return () => {
    factorial *= n++; // why n++ and not ++n?
    return (res += 1 / factorial);
  };
}

// Exercise 2
export function merge(l1: List<number>, l2: List<number>): List<number> {
  if (l1.isEmpty()) return l2;
  if (l2.isEmpty()) return l1;

  const h1 = l1.head();
  const h2 = l2.head();
  if (h1 < h2) return node(h1, merge(l1.tail(), l2));
  return node(h2, merge(l1, l2.tail()));
}
