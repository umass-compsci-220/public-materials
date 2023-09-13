// Reduce Review

type Color = [number, number, number];

// Sample Reduce Implementation
function reduce<T, U>(a: T[], f: (acc: U, e: T) => U, init: U): U {
    let result = init;
    for (let i = 0; i < a.length; ++i) {
        result = f(result, a[i]);
    }
    return result;
}

// Example:

const arr = [3, 2, 6, 2, 2, 0];

const result = reduce(arr, (prod, e) => prod * e, 1);
// Alternatively: arr.reduce((prod, e) => prod * e, 1);

console.log(result);


// In class exercises
export function mainlyBlue(arr: Color[]): number {
    const isBlue = (c: Color) => c[2] >= 2*c[0] && c[2] >= 2*c[1] ? 1 : 0;
    return arr.reduce((acc, c) => acc + isBlue(c), 0);
}

export function mainlyBlue2D(arr: Color[][]): number {
    return arr.reduce((acc, r) => acc + mainlyBlue(r), 0);
}

export function sumLog(nums: number[]): number {
	return nums.filter(num => num > 0).reduce((sum, num) => sum + Math.log(num), 0);
}