// Exercise 1: Closures
export function mostTrue<T>(funarr: ((arg: T) => boolean)[]): (arg: T) => boolean {
  return x => funarr.reduce((acc, f) => (f(x) ? acc + 1 : acc - 1), 0) > 0;
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
