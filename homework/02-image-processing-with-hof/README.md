# Image Processing with HOF

- Please download the project [here](./02-image-processing-with-hof.zip).
- Run `npm install` in the project directory.

## Overview

Following up to [Homework 1](../01-image-processing/README.md), in Homework 2 you will perform more image processing tasks with higher order functions.

### Learning Objectives

- Become more familiar with first-class functions
- Practice writing and using higher-order functions

### Student Expectations

Students will be graded on their ability to:

- Correctly implement the functions [specified below](#programming-tasks)
  - Using private auto-grader tests
- Resolve all linter warnings
  - **There will be credited grading for this (2.5%)**
  - Use `npm run lint` to see if you have any warnings, `npm run lint:fix` may fix some automatically
  - See the section on [linting and formatting assignments](../../resources/homework/EDITING.md#linting-and-formatting-assignments) for more details
- Follow the [coding](../../guidelines/CODING.md), [bad practice](../../guidelines/BAD_PRACTICES.md) and [testing](../../guidelines/TESTING.md) guidelines
  - There will be no grading regarding these rules on this assignment
  - Starting with Homework **3**, there may be crediting manual grading
- Design full-coverage [unit-tests](#testing) for the functions they implemented
  - **There will be credited grading for this (12.5%)**
  - See the [testing guidelines](../../guidelines/TESTING.md#coverage) on coverage

### Resources

Please use the [resources document](../../resources/README.md) if you are stuck.

## Getting Started

All interfaces are the same as the previous assignment. Please review the ["Getting Started" section](../01-image-processing/README.md#getting-started) from Homework 1 if necessary.

## Testing

As with Homework 1, you are expected to write your own tests. To help you get started, we have provided a few test cases inside of [`imageProcessingHOF.test.ts`](./src/imageProcessingHOF.test.ts). It is up to you to define additional tests to check your solution for correctness. As always, try writing some tests before you start coding.

## Programming Tasks

All functions should be written in [`imageProcessingHOF.ts`](./src/imageProcessingHOF.ts.ts). Other files ([`main.ts`](./src/main.ts) and [`imageProcessingHOF.test.ts`](./src/imageProcessingHOF.test.ts)) should import them like so:

```ts
import {
  imageMapCoord,
  imageMapIf,
  mapWindow,
  makeBorder,
  dimCenter,
  isGrayish
  makeGrayish
} from "./imageProcessingHOF.js";
```

**1. Write a function called `imageMapCoord`:**

```ts
export function imageMapCoord(img: Image, func: (img: Image, x: number, y: number) => Color): Image {
  // TODO
}
```

**The result must be a new image** with the same dimensions as `img`. For each pixel in the new image, its color should be the result of applying `func` to the corresponding pixel's color of `img`. This function is more general than `imageMap`; the new pixel's color may also depend on the original image and its coordinates. An example is given to you in [`main.ts`](./src/main.ts).

**2. Write a function called `imageMapIf`:**

```ts
export function imageMapIf(
  img: Image,
  cond: (img: Image, x: number, y: number) => boolean,
  func: (p: Color) => Color
): Image {
  // TODO
}
```

**The result is a new image.** In it, the pixel at $(x, y)$ with color $c$ is either:

1. The value `func(c)` when `cond(img, x, y)` returns `true`
2. $c$ otherwise

**You may not use loops in this function. Instead, use `imageMapCoord` defined above.**

**3. Write a function called `mapWindow`:**

```ts
export function mapWindow(
  img: Image,
  xInterval: number[], // Assumed to be a two element array containing [x_min, x_max]
  yInterval: number[], // Assumed to be a two element array containing [y_min, y_max]
  func: (p: Color) => Color
): Image {
  // TODO
}
```

**The result is a new image.** In it, the value of the pixel at $(x, y)$ is either:

1. The value `func(c)`, where `c` is the original pixel's color, if the pixel coordinates $(x, y)$ are in the interval $[x_{min}, x_{max}]$ and $[y_{min}, y_{max}]$ respectively (inclusive)
2. Identical to the original pixel otherwise.

**Use `imageMapIf`.** You may assume that the second and third argument are always two-element number arrays. The behavior otherwise in not specificed. You could write an `assert` statement to ensure this is the case; however, this is not required. 

### Moving Forward

**For the following functions (4-7), you may not use loops. Instead, use one of the higher-order functions defined above or in Homework 1 (`imageMap`, `mapLine`).** Carefully selecting which function to use will allow you to write your code more concisely and promote reuse, which are important points of the assignment.

**4. Write a function called `makeBorder`:**

```ts
export function makeBorder(img: Image, thickness: number, func: (p: Color) => Color): Image {
  // TODO
}
```

**The result is a new image**, where each pixel whose distance to some edge pixel of the image is less than `thickness` has the value `func(c)`, where `c` is the original pixel's color. Other pixels' colors are unchanged. The distance between two pixels at $(x_1, y_1)$ and $(x_2, y_2)$ is defined as $|x_1-x_2|+|y_1-y_2|$.

More plainly, `makeBorder` produces an image with a rectangular border of given thickness.

**5. Write a function called `dimCenter`:**

```ts
export function dimCenter(img: Image, thickness: number): Image {
  // TOOD
}
```

**The result is a new image**, where a border of pixels along the image edges are unchanged from the input. A pixel is in the border if it has distance less than `thickness` to some edge pixel. The remaining pixels have each color channel (intensity) reduced by 20%. Use [`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) to truncate any decimal remainder.

**6. Write a function called `isGrayish`:**

```ts
export function isGrayish(p: Color): boolean {
  // TODO
}
```

The result should be true if and only if the difference between the maximum and minimum color channel value is at most 85 (one third of 255). You may assume that `p` is a valid color according to the `Image` library.

**7. Write a function called `makeGrayish`:**

```ts
export function makeGrayish(img: Image): Image {
  // TODO
}
```

**The result is a new image**, where each grayish pixel, as determined by the `isGrayish` function, is left unchanged. All other pixels should be replaced with a gray-scale pixel, computed by averaging the three channels. If the input pixel's color is $(r, g, b)$, its gray-scale version is $(m, m, m)$ where $m$ is the truncated average of $r$, $g$, and $b$. Other pixel colors are unchanged. **Use a suitable function defined above.**

## Submitting

See the [Homework 1 submission guide](../01-image-processing/README.md#submitting).
