// Map Review

// Sample map implementation
function map<T, U>(a: T[], f: (x: T) => U): U[] {
  const result: U[] = [];
  for (let i = 0; i < a.length; ++i) {
    const new_val: U = f(a[i]);
    result.push(new_val);
  }
  return result;
}

// Example:
function double(x: number): number {
  return 2 * x;
}

// Alternatively we can use an arrow function
const double2 = (x: number) => 2 * x;

const to_map_arr = [1, 2, 3, 4, 5];

const mappedArr1 = map(to_map_arr, double);
const mappedArr2 = to_map_arr.map(double2);

// What will mappedArr1 and mappedArr2 be?
console.log(`mappedArr1: ${mappedArr1}`);
console.log(`mappedArr2: ${mappedArr2}`);

// Filter Review

// Sample filter implementation
function filter<T>(a: T[], f: (x: T) => boolean): T[] {
  const result: T[] = [];
  for (let i = 0; i < a.length; ++i) {
    const x = a[i];
    if (f(x)) {
      result.push(x);
    }
  }
  return result;
}

//Example:
function isEven(x: number): boolean {
  return x % 2 === 0;
}

// Again, we can use an arrow function
const isEven2 = (x: number) => x % 2 === 0;

const to_filter_arr = [1, 2, 3, 4, 5];

const filteredArr1 = filter(to_filter_arr, isEven);
const filteredArr2 = to_filter_arr.filter(isEven2);

// What will filteredArr1 and filteredArr2 be?
console.log(`filteredArr1: ${filteredArr1}`);
console.log(`filteredArr2: ${filteredArr2}`);

// In class exercises

function keepNonNegativeValues(a: number[]): number[] {
  return a.filter(x => x >= 0);
}

export function nonNegatives2D(arr: number[][]): number[][] {
  return arr.map(keepNonNegativeValues);
}

export function longWords2D(text: string[][]): string[][] {
  return text.map(a => a.filter(s => s.length > 3)).filter(a => a.length > 0);
}
