import { List, node, empty } from "../include/lists.js";

// Exercise 1: Lists
export function merge(l1: List<number>, l2: List<number>): List<number> {
  if (l1.isEmpty()) return l2;
  if (l2.isEmpty()) return l1;

  const h1 = l1.head();
  const h2 = l2.head();
  if (h1 < h2) return node(h1, merge(l1.tail(), l2));
  return node(h2, merge(l1, l2.tail()));
}

// Exercise 2: Closures

// See solutions slides for closures exercise answers.
