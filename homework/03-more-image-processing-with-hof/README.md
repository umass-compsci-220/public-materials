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
  - See the section on [linting and formatting assignments](../../resources/homework/EDITING.md#linting-and-formatting-assignments) for more details
- Follow the [coding](../../guidelines/CODING.md), [bad practice](../../guidelines/BAD_PRACTICES.md) and [testing](../../guidelines/TESTING.md) guidelines
  - There may be manual grading regarding this guidelines from this point forward
  - Manual grading will be out of 10-15 points, resulting in a final HW score out of 110/115
  - This assignment puts extra emphasis on **avoiding [code duplication](../../guidelines/CODING.md#code-duplication)**
  - We are not out to get you, these guidelines are here to help you avoid problematic code
  - As long as you are making an attempt to follow the guidelines, you will be fine
- Design full-coverage [unit-tests](#testing) for the functions they implemented
  - See the [testing guidelines](../../guidelines/TESTING.md#coverage) on coverage for mor details

### Resources

Please use the [resources document](../../resources/README.md) if you are stuck.

## Testing

You must write tests for all your functions, following the principles used so far.

## Getting Started

All interfaces are the same as the previous assignments. Please review the ["Getting Started" section](../01-image-processing/README.md#getting-started) from Homework 1 if necessary.

Similar to [Homework 2](../02-image-processing-with-hof/README.md), you have been given minimal template code. It is up to you to write it yourself. Use the patterns showcased in [Homework 1](../01-image-processing/README.md).

## Programming Tasks

If you are having trouble reading the specification, please go to office hours or ask a question on Campuswire.

This assignment puts extra emphasis on avoiding code duplication. Many of the following functions have similar operations and conditions. You should try writing helper methods to use across all of them . **Submissions that write if-statements for each case (whether or not a neighbor is present, how many neighbors are exactly present, etc.) could receive point deductions.** If you have a series of if-statements with _similar conditions or similar bodies_, or separate functions with near-identical bodies, consider an alternative approach.

**It is okay to complete a function with some code duplication first, then reevaluate your approach.** It is never a good idea to prematurely optimize or refactor your code. Focus on writing something that works, then shift your focus to making that solution cleaner and more efficient.

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

The result is the blurred value of the pixel at coordinates $(x, y)$, assumed to be valid for the image. Each color channel of the resulting pixel should be the rounded mean of the same channels of the $(x, y)$ pixel itself and its neighbors in `img`. Two distinct pixels are neighbors if both their x-coordinates and y-coordinates differ by at most 1 in absolute value. **Avoid [code duplication](../../guidelines/CODING.md#code-duplication).**

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
