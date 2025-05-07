import { snode, Stream, sempty } from "../include/stream.js";
import { Observable } from "../include/observable.js";

type Tree<T> = { left?: Tree<T>; v: T; right?: Tree<T> };

// Lazily appends two streams.
function append_thunk<T>(left: Stream<T>, right: () => Stream<T>): Stream<T> {
  return left.isEmpty() ? right() : snode(left.head(), () => append_thunk(left.tail(), right));
}

// TODO: Exercise 1
// Finds the preorder traversal of the tree
export function preorderStream<T>(t: Tree<T> | undefined): Stream<T> {
  if(t === undefined) return sempty<T>();
  return snode(t.v, () => {
    if(t.left && t.right) return append_thunk(preorderStream(t.left), () => preorderStream(t.right));
    else if(t.left) return preorderStream(t.left)
    else if(t.right) return preorderStream(t.right)
    else return sempty<T>();
  })
}

// TODO: Exercise 2
export function merge(o1: Observable<string>, o2: Observable<string>): Observable<string> {
  const r: Observable<string> = new Observable();
  const merger = (e: string) => {
    r.update(e);
  };
  o1.subscribe(merger);
  o2.subscribe(merger);
  return r; // The function simply needs to subscribe the new observer with updates from both of the original ones.
}
