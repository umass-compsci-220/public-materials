# Image Processing

- Please download the project [here](./01-image-processing.zip).
- If you need help installing [VSCode](https://code.visualstudio.com/) and [Node.js](https://nodejs.org/) (required for this course), read [this document](../../resources/homework/ENVIRONMENT.md).
- If you need help opening the project, read [this document](../../resources/homework/EDITING.md).
- **After opening, run `npm install` in a VSCode terminal**

## Overview

**The goal of this assignment is to introduce you to the basic features of TypeScript/JavaScript, such as functions, variables, conditionals, and loops.** You should already be familiar with these concepts from other programming languages (Python, Java). **You will use these features to write several image processing functions** (e.g., manipulating image colors). You will also work with, and write your own, higher-order functions.

### Learning Objectives

- Become familiar with the TypeScript syntax, and JavaScript runtime behavior, of functions, loops, and arrays
- Understand why higher order functions are so useful
- Know how to pass a function to a function and how to receive a function in a function
- Learn basic testing methodology and syntax

### Student Expectations

Students will be graded on their ability to:

- Correctly implement the functions [specified below](#programming-tasks)
  - Using private auto-grader tests
- Follow the [coding](../../guidelines/CODING.md), [bad practice](../../guidelines/BAD_PRACTICES.md), and [testing](../../guidelines/TESTING.md) guidelines
  - For future assignments, there may be manual grading for these guidelines
  - To ease your transition into this course, **there will not be credited grading on the first two homeworks**
  - However, by the third homework you can expect these guidelines to be fully enforced
- Design full-coverage [unit-tests](#testing) for the functions they implemented
  - The autograder will calculate and score you based off how well you write your tests
  - See [testing guidelines](../../guidelines/TESTING.md#coverage) on coverage

### Resources

Please use the [resources document](../../resources/README.md) if you are stuck. Particularly:

- [Editing](../../resources/homework/EDITING.md), [running/debugging](../../resources/homework/RUNNING_AND_DEBUGGING.md), and [testing](../../resources/homework/TESTING.md) a project
- [Functions and Arrow Functions](../../resources/FUNCTIONS_AND_ARROW_FUNCTIONS.md)
- [MDN Guide on Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
  - [MDN Docs Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN Guide on Arrays](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)

## Getting Started

### Digital Representation of Images

**Any image you see on your computer screen consists of tiny square dots known as pixels.** On many screens, individual pixels are too small to see with the naked eye, but if you look very closely, you may be able to discern the pattern in which pixels are arranged, as illustrated in the figure below.

<p align="center">
  <img src="../../media/image-pixels.png" />
</p>

**Pixels are arranged in a grid and each pixel has x- and y- coordinates that identify its position in the grid.** All coordinates are non-negative integers and the top-left corner has the coordinates (0, 0). Therefore, the x-coordinate increases as you move right and the y-coordinate increases as you move down. For example, if we had an image with just nine pixels arranged in a 3-by-3 grid, their coordinates would appear as shown below.

<p align="center">
  <img src="../../media/image-coordinates.svg" />
</p>

**Finally, every pixel has a color that is represented using the three primary colors (i.e., red, green, and blue).** Therefore, to set the color of a pixel, you have to specify how much red, green, and blue to use. **Each of these primary colors has an _integer_ intensity between 0 and 255 (inclusive).** For example, to get a black pixel, we can set the intensity of the three primary colors to 0, thus the black pixel value is `[0, 0, 0]`, and to get a white pixel we can set the intensity of the three primary colors to 255, thus the white color pixel value is `[255, 255, 255]`.

In this project, you will use a very simple image manipulation library that enables you to load images from a gallery, set the color of each pixel, and read the color of each pixel. These are the only primitive functions you need to build sophisticated image processing functions yourself.

### The `Image` Class and Related Members

We have provided you the `Image` class and related members to interact and manipulate images [`./include/image.ts`](./include/image.ts). At the top of [`imageProcessing.ts`](./src/imageProcessing.ts) you should see the following line:

```ts
import type { Image, Color } from "../include/image.js";
```

This imports the `Image` class and `Color` type into the file. An `Image` represents a digital picture that has been loaded into memory. Its public interface (what is exposed) is as follows:

```ts
class Image {
  static loadImageFromGallery(name?: ImageName): Image;
  static loadImageFromFile(filePath: string): Image;
  static create(width: number, height: number, fillColor: Color): Image;

  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number, data: Uint8ClampedArray);

  getPixel(x: number, y: number): Color;
  setPixel(x: number, y: number, color: Color): void;
  copy(): Image;
  save(fileName: string): void;
  show(): void;
  assertCoordinatesInBounds(x: number, y: number): void;
}
```

The `Image` class itself has three static methods used to create images (**DO NOT USE `new Image()` TO MAKE AN IMAGE**):

```ts
// Load an image from the provided gallery (see ./images folder)
const art = Image.loadImageFromGallery("art");
// Load a random image from the provided gallery
const random = Image.loadImageFromGallery();
// Load a .png image from a file on your computer
const mySpecialImage = Image.loadImageFromFile("/path/to/my/image.png");
// Create an image by defining a width height and fill color
// A 50 pixel by 25 pixel white image
const redImage = Image.create(50, 25, [255, 0, 0]);
```

Instances of the image class have two fields: `width` and `height`. They also have two methods to read and modify the pixels inside of the image.

```ts
console.log(redImage.width); // -> 50
console.log(redImage.height); // -> 25

// Sets the top left pixel to black
redImage.setPixel(0, 0, [0, 0, 0]);
console.log(redImage.getPixel(0, 0)); // -> [0, 0, 0]
```

There is also the `Image.copy()` method, which will create a duplicate of the current image (same `width`, `height`, and set of pixels);

```ts
const copyOfRed = redImage.copy();
console.log(copyOfRed.getPixel(0, 0)); // -> [0, 0, 0]
console.log(copyOfRed.getPixel(5, 5)); // -> [255, 0, 0]

redImage.setPixel(0, 0, [255, 0, 0]); // Does not change any of the copies
console.log(copyOfRed.getPixel(0, 0)); // -> [0, 0, 0]
```

`Image.show()` and `Image.save()` can be used to inspect the resulting images.

```ts
// Supply a name to give the saved image,
// and this method will create a file in the images_out folder called <name>.png
redImage.save("redOutput");
// Opens the image in a VSCode preview.
redImage.show();
```

There is also the `Image.assertCoordinatesInBounds` method, which will throw an error the supplied coordinates do not fit within the image.

In addition to `Image`, [`image.ts`](./include/image.ts) exports the `Color` type. Inspecting the source code reveals that this is an alias for `number[]` (an array of numbers). Our variables will still hold values that are array's of numbers - this type solely exits to make the `Image` interface more descriptive.

```ts
const arr = [0, 0, 0];
// Works fine, the type of arr (number[]) is compatible with Color
renImage.setPixel(0, 0, arr);
```

There is also an object (similar to a hash table) called `COLORS`, which is used to get the digital representation of a color from its name. This could be helpful inside of [`main.ts`](./src/main.ts) or [`imageProcessing.test.ts`](./src/imageProcessing.test.ts).

```ts
// include/image.ts
export const COLORS = {
  WHITE: [255, 255, 255],
  BLACK: [0, 0, 0],
  RED: [255, 0, 0],
  GREEN: [0, 255, 0],
  BLUE: [0, 0, 255],
  AQUA: [0, 255, 255],
  YELLOW: [255, 255, 0],
  MAGENTA: [255, 0, 255],
};

// src/main.ts
import { Image, COLORS } from "../include/image.js";

const blueImage = Image.create(25, 25, COLORS.BLUE);
const blackImage = Image.create(25, 25, COLORS.BLACK);
```

Inside of the project's [`main.ts`](./src/main.ts) is some example usages of the `Image` interface. You can read the full documentation and source for everything inside of [`image.ts`](./include/image.ts).

## Testing

**An important part of programming is testing your code thoroughly.** Without appropriate unit tests, you may not catch bugs in your code. There is an auto-grader, but **you will not be able to see complete results until after the deadline**. This is to encourage you to embrace [test driven development](https://en.wikipedia.org/wiki/Test-driven_development). You will be scored on how well you write your tests, so it is always a good idea to write a few tests before you start the programming tasks.

To help you get started, we have provided a few test cases inside of [`imageProcessing.test.ts`](./src/imageProcessing.test.ts). It is up to you to define additional tests to check your solution for correctness. Please follow the same general syntax of the tests defined for you.

Checkout the [project testing document](../../resources/homework/TESTING.md) for information about testing methodology and syntax. The [testing guidelines](../../guidelines/TESTING.md) documents requirements your tests should follow.

## Programming Tasks

If you are having trouble reading the specification, please go to office hours or ask a question on Campuswire (**search for a similar question first**).

All functions should be written in [`imageProcessing.ts`](./src/imageProcessing.ts). Other files ([`main.ts`](./src/main.ts) and [`imageProcessing.test.ts`](./src/imageProcessing.test.ts)) should import them like so:

```ts
import { removeRed, flipColors, mapLine, imageMap, mapToGB, mapFlipColors } from "./imageProcessing.js";
```

1. Write a function called `removeRed` that takes an image as an argument and returns a new image, where each pixel has the red color channel removed. If the `Color` of a pixel is $(r, g, b)$ in the input image, its `Color` in the output must be $(0, g, b)$.

2. Write a function called `flipColors` that takes an image as an argument and returns a new image, where each pixel has each `Color` channel set to the average of the other two channels in the original pixel. Truncate any decimal remainder using [`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor).

If you have solved these two tasks, you might notice that the structure of the two functions is very similar, the difference is only in the actual processing applied. We can avoid duplication by defining functions, similar to [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), that apply the same transformation to several or all pixels of an image.

3. Write a function with the following header:

```ts
export function mapLine(img: Image, lineNo: number, func: (c: Color) => Color): void {
  // body
}
```

The function _should modify_ the given image in place, so that the value of each pixel in the given horizontal line is the result of applying `func` to the corresponding pixel of `img`. It does not return any value. If `lineNo` is not a valid line number, then `img` should not be modified.

4. Write a function with the following header:

```ts
export function imageMap(img: Image, func: (c: Color) => Color): Image {
  // body
}
```

The result must be a new image with the same dimensions as `img`. The value of each pixel in the new image should be the result of applying `func` to the corresponding pixel of `img`. <u>**Use `mapLine`**</u>.

5. Write two functions `mapToGB` and `mapFlipColors` that are equivalent to (i.e., have the same type signature and behave exactly like) `removeRed` and `flipColors` <u>**but use must use `imageMap`**</u>.

## Submitting

Use the following command to build a `.zip` file:

```sh
npm run build:submission
```

This command will automatically format your submissions source code so it is easier to read then bundle your `./src/*` files into a `.zip`. Please upload this file to the respective assignment on Gradescope.
