/**
 * Exercise 1
 * Program Correctness
 */

// Skeleton for Q1

// function partition_even_odd(arr) {
//     if (arr.length === 0) {
//         return;
//     }
//     let low = ???;
//     let high = ???;
//     // low/high form a window, the outside of which is partitioned;
//     // the window shrinks iteratively until everything is partitioned
//     while (???) {
//         if (???) {
//             // swap arr[low] and arr[high]
//             ???
//         }
//         if (???) {
//             // update low
//             ???
//         }
//         if (???) {
//             // update high
//             ???
//         }
//     }
// }

/**
 * Exercise 2
 * Async
 *
 * Write a function asyncPosMap(arr: T[], f: T => Promise(number): Promise<T[]>.
 * This function takes a generic array, arr and an asynchronous function f, and returns
 * a new Promise. That promise should be fulfilled with a new array containing the elements
 * of arr that for which f resolved to a positive number. The promise should reject if
 * at any point f rejects. Ensure that calls to f occur asynchronously, by using Promise.all.
 */

export function asyncPosMap<T>(arr: T[], f: (f: T) => Promise<number>): Promise<T[]> {
  return Promise.all(arr.map(f)).then((nums: number[]) => {
    return arr.filter((_, i) => nums[i] > 0);
  });
}

// If any call to f rejects, Promise.all will return a promise that rejects. This will bubble
// though our .then. Thus, if f rejects, so does our returned promise.
