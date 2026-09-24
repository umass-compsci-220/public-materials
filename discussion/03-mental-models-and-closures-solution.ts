// Exercise 1: Mental Models (see slides and worksheet)

// Exercise 2: Closures

export function factorialSum(): () => number {
  let n = 1,
    factorial = 1,
    sum = 0;
  // can you shorten this even further?
  return () => {
    factorial *= n++; // why n++ and not ++n?
    sum += factorial;
    return sum;
  };
}
