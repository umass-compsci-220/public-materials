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
