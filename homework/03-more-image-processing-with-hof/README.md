# More Image Processing with HOF

Please download the project [here](./03-more-image-processing-with-hof.zip).

## Overview

Following up on [Homework 1](../01-image-processing/README.md) and [Homework 2](../02-image-processing-with-hof/README.md), you will perform _even_ more image processing tasks with higher-order functions. These functions will have a set of similar conditions and operations, which might tempt you to repeat code. However, one of the requirements of this assignment is that your implementations are clean and do not duplicate code.

### Learning Objectives

- Master using and writing higher-order functions
- Practice avoiding code duplication
- Practice using and writing closures

### Student Expectations

Students will be graded on their ability to:

- Correctly implement the functions [specified below](#programming-tasks)
  - Using private auto-grader tests
- Resolve all linter warnings
  - **There will be credited grading for this (2.5%)**
  - See the section on [linting and formatting assignments](../../resources/homework/EDITING.md#linting-and-formatting-assignments) for more details
- Follow the [coding](../../guidelines/CODING.md), [bad practice](../../guidelines/BAD_PRACTICES.md) and [testing](../../guidelines/TESTING.md) guidelines
  - **There may be manual grading regarding this guidelines from this point forward**
  - Manual grading will be out of 10-15 points, resulting in a final HW score out of 110/115
  - This assignment puts extra emphasis on **avoiding [code duplication](../../guidelines/CODING.md#code-duplication)**
  - We are not out to get you, these guidelines are here to help you avoid problematic code
  - As long as you are making an attempt to follow the guidelines, you will be fine
- Design full-coverage [unit-tests](#testing) for the functions they implemented
  - **There will be credited grading for this (12.5%)**
  - See the [testing guidelines](../../guidelines/TESTING.md#coverage) on coverage for mor details

### Resources

Please use the [resources document](../../resources/README.md) if you are stuck.

## Testing

You must write tests for all your functions, following the principles used so far.

### Changing How We Compare Colors

Arithmetic with the `number` type produces some non-obvious results:

```ts
console.log(0.1 + 0.2); // .30000000000000004 🤨
```

This is a common issue in programming languages that use [floating point numbers](https://en.wikipedia.org/wiki/Floating-point_arithmetic). [This website](https://floating-point-gui.de/) gives a great overview of how floating point numbers work and why this behavior exists.

Throughout this homework, you will be doing arithmetic with fractional values (finding the (weighted) mean). Depending on the order of the operations, you may get a different result:

```t
console.log((254 + 254 + 254) / 3); // 254
console.log(((1 / 3) * 254) + ((1 / 3) * 254) + ((1 / 3) * 254)); // 253.99999999999997
```

Hopefully it is clear to see that this can become a problem because we truncate any decimal remainder in our calculations. To reconcile this issue we need to change how we define "equality" between two `Color` values. Instead of strictly checking that each channel is exactly what it should be:

```ts
const actual = img.getPixel(0, 0);
assert(actual[0] === 0);
assert(actual[1] === 0);
assert(actual[2] === 0);

// or

expect(img.getPixel(0, 0)).toEqual([0, 0, 0]);
```

We should accept a precision of error (in this case default to less than or equal to 1) between two values:

```ts
function expectColorToBeCloseTo(actual: Color, expected: Color, error = 1) {
  [0, 1, 2].forEach(i => expect(Math.abs(actual[i] - expected[i])).toBeLessThanOrEqual(error));
}

expectColorToBeCloseTo([0, 0, 0], [1, 1, 1]); // Will not error
expectColorToBeCloseTo([0, 0, 0], [0, 0, 0]); // Will not error
expectColorToBeCloseTo([0, 0, 0], [0, 0, 2]); // Will error
```

You may need to use the function above when writing your own tests.

## Getting Started

All interfaces are the same as the previous assignments. Please review the ["Getting Started" section](../01-image-processing/README.md#getting-started) from Homework 1 if necessary.

## Programming Tasks

If you are having trouble reading the specification, please go to office hours or ask a question on Campuswire.

This assignment puts extra emphasis on avoiding code duplication. Many of the following functions have similar operations and conditions. In `lineBlur3p`, you are tasked with blurring a line by computing the weighted average between a pixel and its horizontal neighbors which are at most 1 away. In `lineBlur5p`, you use horizontal neighbors which are up to 2 away. You should try writing helper functions to use across these two. Imagine if you were tasked with writing `lineBlur25p` (you are not, just consider the scenario), which used neighbors up to 12 away. After properly abstracting `lineBlur3p` and `lineBlur5p`, creating `lineBlur25p` should not require much effort.

Similar story with `pixelBlur`, it uses pixels whose coordinates differ by at most 1 in absolute value. Imagine if you were to write a function that used pixels whose coordinates differ by at most 50 in absolute value. Would your code be able to support that without much effort?

**Submissions that do not attempt to avoid code duplication may receive manual grading point deductions (~12%).** If you have a series of if-statements with similar conditions or similar bodies, or separate functions with near-identical bodies, consider an alternative approach. If-statements are allowed, but do not abuse them.

Try to avoid repetition from the get-go, don't delay it to "after my code works". **Read the descriptions of all the tasks before you start coding.**

1. Write a function called `lineBlur3p`:

```ts
export function lineBlur3p(img: Image, lineNo: number): void {
  // TODO
}
```

**The function should modify the image**, only for any pixels having y-coordinate equal to `lineNo`. The new value of each color channel is computed as a weighted sum of the original color value in the pixel and in its neighbor(s) on that line. The weight for any neighbor is $1/3$, and the weight for the original pixel is $(1 - \text{sum of neighbor weights})$. Truncate the final sum to a whole number to get the final color channel. **Avoid [code duplication](../../guidelines/CODING.md#code-duplication).**

See ["Weighted average"](https://simple.wikipedia.org/wiki/Weighted_average) on Wikipedia for more details.

2. Write a function called `lineBlur5p`:

```ts
export function lineBlur5p(img: Image, lineNo: number): void {
  // TODO
}
```

**The function should modify the image**, only for any pixels having y-coordinate equal to `lineNo`. The new value of each color channel is computed as a weighted sum of the original color value in the pixel and in all other pixels on that line which are at distance up to 2. The weight for any such pixel is $1/5$, and the weight for the original pixel is $(1 - \text{sum of other pixel weights})$. **Avoid [code duplication](../../guidelines/CODING.md#code-duplication) (think about the commonalities between this and `lineBlur3p`). Use the same truncating process as `lineBlur3p`.**

3. Write a function called `blurLines`:

```ts
export function blurLines(img: Image, blurLine: (img: Image, lineNo: number) => void): Image {
  // TODO
}
```

**It returns a new image.** In this image, each line has been blurred using the supplied `blurLine` function.

4. Write a function called `pixelBlur`:

```ts
export function pixelBlur(img: Image, x: number, y: number): Color {
  // TODO
}
```

The result is the blurred value of the pixel at coordinates $(x, y)$, assumed to be valid for the image. Each color channel of the resulting pixel should be the truncated mean of the same channels of the $(x, y)$ pixel itself and its neighbors in `img`. Two distinct pixels are neighbors if both their x-coordinates and y-coordinates differ by at most 1 in absolute value. **Avoid [code duplication](../../guidelines/CODING.md#code-duplication).**

5. Write a function called `imageBlur`:

```ts
export function imageBlur(img: Image): Image {
  // TODO
}
```

**The result is a new image** that is the blurred version of the argument, with pixels obtained by applying `pixelBlur` to each pixel of the input image. You may not use loops within this function. Instead, use `imageMapCoord` from Homework 2.

6. Write a function `composeFunctions`::

```ts
export function composeFunctions(fa: ((p: Color) => Color)[]): (x: Color) => Color {
  // TODO
}
```

It returns a single function (from `Color` to `Color`) that composes all functions in the argument array, with the function at index 0 applied to the color first. Use [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) to implement it.

A function composition, $h(x) = g \circ f$, is defined as $h(x) = g(f(x))$. You are tasked with composing up to $n$ functions.

7. Write a function called `combineThree`:

```ts
export function combineThree(img: Image): Image {
  // TODO
}
```

**The result is a new image** where each pixel's color is transformed successively as done by `removeRed`, and then twice by `flipColors`, in this order. Use `imageMap` (of HW1) and `composeFunctions`.
