// Execise 1: Mental Models
const mkList = <T>(init: T, f: (x: T) => T) => ({
  next: () => mkList(f(init), f),
  value: () => init,
});

let cnt = 0;
const a = [mkList(0, x => x + 1), mkList(cnt, () => ++cnt)];
const b = a.map(lst => lst.next().next());
console.log(b[1].value());

// Exercise 2: Closures
export function mostTrue<T>(funarr: ((arg: T) => boolean)[]): (arg: T) => boolean {
  return x => funarr.reduce((acc, f) => (f(x) ? acc + 1 : acc - 1), 0) > 0;
}

// Exercise 3: Closures
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
