# Coding Guidelines

- [Formatting: Indentation, Bracing, and Spacing](#formatting-indentation-bracing-and-spacing)
- [Naming](#naming)
- [Comments](#comments)
- [Files Have Purpose](#files-have-purpose)
- [Function Size](#function-size)
- [Code Duplication](#code-duplication)
- [Code Logic](#code-logic)
- [Bad Practices](./BAD_PRACTICES.md)

This document contains numerous coding guidelines.

## Formatting: Indentation, Bracing, and Spacing

Formatting is automatically handled with [Prettier](https://prettier.io/) when you build your submission with `npm run build:submission`. Projects will come with a `.prettierrc` file that specifies the configuration. You _are not_ allowed to change this configuration file.

If you would like format without building the `.zip`, use the `npm run format` command. Alternatively, you can install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to bring formatting into the editor.

## Naming

Use descriptive identifiers (names) that make the data type and purpose of the member (variable, function, class, etc.) clear to readers. Misleading names are worst: calling a list `array` or a number `obj`.

Naming style depends on the author and context. Ideally, you should stick with the most prominent style of the language or codebase. In this class, you should choose something that is consistent.

## (Optional) Naming Suggestions

In TypeScript and JavaScript, use `camelCase` for variables, functions, fields, and methods. Use `UPPER_SNAKE_CASE` for significant constants. `PascalCase` for classes, interfaces, and user-defined types. Use uppercase letters (starting from `T`) for parametric types. Examples:

```ts
let thisIsAReallyLongVariableNameInCamelCase = 0;
function thisIsMyFunctionsName(parameterOne: number, parameterTwo: number) {}

class MyReallyCoolClassInPascalCase {
  fieldOne: number;
  fieldTwo: number;
  methodOne() {}
}

interface Person {
  name: string;
  address: string;
}

const MAX_LENGTH = 5;

function myReallyGenericFunction<T, U, V>(t: T, u: U, v: V) {}
```

Short names for temporaries with a scope not exceeding a few lines are fine. But if a variable stores an important value that exists for many lines, you should give it a decent name.

```ts
const arr = [1, 2, 3];
const doubled = arr.map(x => x * 2); // OK

let x = arr[i];
let y = arr[i + 1];
// 30+ lines of code using x and y
return otherArray[x + y] >= 0 || otherArray[x - y]; // At this point, you forget what x and y are.
```

Functions do stuff! They perform actions using their supplied arguments. Try expressing this action by using verbs or action words in their names.

```ts
// MEH: No context to what the function is doing, just an adjective.
function equal(x: number, y: number): boolean {}
// GOOD: Context - a question. Are these two things equal?
function isEqual(x: number, y: number): boolean {}
// MEH: `move` does not fully capture what the function does. Move? How much?
function move(x: Player, position: Position): void {}
// GOOD: Adding the `To` makes it clear that you are moving to a specific location.
function moveTo(x: Player, position: Position): void {}
```

Functions that return booleans should start with: `is`, `has`, `can`, `could`, or `did`.

```ts
function isOwner(userId: string): boolean {}
function hasMembership(userId: string): boolean {}
```

## Comments

Comments should be enough for an unfamiliar reader to understand the code. Reasonably complex statements should be documented as necessary. Such as statements that use a formula or algorithm.

Each function should be preceded by a [TSDoc](https://tsdoc.org/) comment explaining arguments, results, and meaning. Explicitly note any side effects or dependencies.

```ts
/**
 * Returns the average of two numbers.
 *
 * @param x - The first input number
 * @param y - The second input number
 * @returns The arithmetic mean of `x` and `y`
 *
 */
function getAverage(x: number, y: number): number {
  return (x + y) / 2.0;
}
```

## Files Have Purpose

Homeworks have the following file structure:

```text
homework1/
├─ node_modules/      - Packages
├─ include/           - Provided utility code
├─ src/               - Your submission
│  ├─ main.ts           - Driver code, your playground
│  ├─ ????.ts           - Project required functions/classes
|  ├─ ????.test.ts      - A single test "suite", where your tests should be
├─ package.json       - Project metadata (name, author, dependencies, scripts)
├─ package.lock.json  - Specific dependency information (hashes)
```

Each file has a specific purpose. `index.ts` is your playground. You may use it to write small programs that use the members (functions or classes) defined in the `include/` folder. Use the provided `?????.test.ts` file to write your tests.

If you were designing a math library, it would not make much sense if there was code between your provided functions:

```ts
export function mean(a: number, b: number): number {
  /* code */
}
export function median(data: number[]): number {
  /* code */
}

// DO NOT HAVE RANDOM CODE IN THE MIDDLE OF A FILE
// If they are tests, then put them in the test file
// If they are examples or driver code, put them in the `main.ts` file
const x = mean(1, 2);
const y = median([1, 5, 4, 8, 5]);

console.assert(x === 1.5);
console.assert(y === 4);

export function mode(data: number[]): number {
  /* code */
}
```

## Function Size

Functions should be small and manageable. Anything with standalone functionality deserves to be a function, even if used once. If a block of code spans more than a dozen lines, then it should be either modularized (made into separate functions) or commented out until you think of an alternative approach. This is helpful visually as functions can be collapsed and [documented](#comments).

If you find yourself **copy-and-pasting a bit of code**, instead of pasting it to where you need to use it, paste it into its function. Then replace the original bit of code with a call to that new function.

## Code Duplication

Code duplication is very bad. It takes up space, distracts, and fatigues the reader; it makes maintenance and testing difficult.

Duplicate code deserves refactoring into a function. Different data becomes function arguments. Different operations (+ vs. \*, etc.) become function arguments for higher-order functions (recall how we introduced them initially). Even a reasonably complicated expression should not be duplicated, but possibly transformed into a function.

Each assignment can be completed in a graceful way - if you ever think "Is this too much?", the answer is probably yes. Reducing code duplication is not always easy, especially if you are new to a language and do not know all of its features. Please, **go to office hours and review past and current assignments. There is always somewhere to improve**.

## Code Logic

### Data Flow

A typical function receives arguments and returns a result. Ideally, the function should only depend on its arguments. Other dependencies and side effects must be documented. Read the specification carefully, and implement it exactly as stated. Make sure any outputs are computed exactly from the specified data and do not overwrite any of the original data. The function should not modify its arguments unless required by the specification.

### Stick with the Function's Purpose

Each function should have a strict and defined purpose. It should do nothing more and nothing less. If you are tasked with writing a function that takes in an `Image` and returns a modified copy, then you _should not_ have calls to `save` or `show` inside of your implementation.

```ts
// imageManipulation.ts
function imageMap(img: Image, f: (c: Color) => Color): Image {
  const copy = img.copy();

  // Implementation of imageMap
  copy.show(); // DO NOT DO THIS

  return copy;
}
```

Here the line `copy.show()` makes no sense in the context of the function. The function was designed to do a single thing. Adding a `.show()` in the middle is adding extra functionality.

Instead, this logic should be omitted and left up to the caller of the function to decide what to do with the result.

```ts
// index.ts
imageMap(myImage).show();
```

## Bad Practices

Your code should be well-designed and thought-out. Please read the [document on bad practices for what to avoid](./BAD_PRACTICES.md).
