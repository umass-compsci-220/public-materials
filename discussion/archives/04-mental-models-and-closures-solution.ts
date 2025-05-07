interface MyIterator<T> {
  hasNext: () => boolean;
  next: () => T;
}

// Exercise 1: Iterators
export function concatIt<T>(it1: MyIterator<T>, it2: MyIterator<T>) {
  return {
    hasNext() {
      return it1.hasNext() || it2.hasNext();
    },
    next() {
      return it1.hasNext() ? it1.next() : it2.next();
    },
  };
}

// Exercise 2: Mental Models (no Gradescope)
const mkList = <T>(init: T, f: (x: T) => T) => ({
  next: () => mkList(f(init), f),
  value: () => init,
});
let cnt = 0;
const a = [mkList(0, x => x + 1), mkList(cnt, _ => ++cnt)];
const b = a.map(lst => lst.next().next());
console.log(b[1].value());

// Exercise 3: More Iterators
export function prependIt<T>(v: T, it2: MyIterator<T>): MyIterator<T> {
  let hasNext = () => true; // for first element
  let next = () => {
    next = it2.next; // assigning variables will continue with iterator it2
    hasNext = it2.hasNext;
    return v; // will only execute once, then switch to it2
  };
  return { hasNext: () => hasNext(), next: () => next() };
}

/**
Lab 3 Spring 2025:

// Exercise 1: Closures
export function mostTrue<T>(funarr: ((arg: T) => boolean)[]): (arg: T) => boolean {
  return x => funarr.reduce((acc, f) => (f(x) ? acc + 1 : acc - 1), 0) > 0;
}

// Exercise 2: Iterators
interface MyIterator<T> {
  hasNext: () => boolean;
  next: () => T;
}

export function mkIterator(n: number): MyIterator<[number, number]> {
  let i = 1,
    j = 1;
  return {
    hasNext: () => i < n,
    next: () => {
      const r: [number, number] = [i, j];
      if (--j === 0) j = ++i;
      return r;
    },
  };
}

// Old Exercise 2 (Mental Models)
// Execise 2: Mental Models (No Gradescope)
// const mkList = <T>(init: T, f: (x: T) => T) => ({
//   next: () => mkList(f(init), f),
//   value: () => init,
// });

// let cnt = 0;
// const a = [mkList(0, x => x + 1), mkList(cnt, () => ++cnt)];
// const b = a.map(lst => lst.next().next());
// console.log(b[1].value());

// Exercise 3: More Closures
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

*/
