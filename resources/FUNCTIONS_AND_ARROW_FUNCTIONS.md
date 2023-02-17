# Functions and Arrow Functions

## Functions

Here is the general syntax for defining a function in TypeScript (TS). The following syntax is called a function definition.

```ts
// function identifier([identifier: Type[, identifier: Type[...]]]): ReturnType { statement-list }
function theNameOfTheFunction(/* a comma separated list of parameters */): void {
  //                                    ↪ This, the name and parameter list, is called the function header
  // function body
}
```

The [MDNs definition of function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions):

> Generally speaking, a function is a "subprogram" that can be called by code external (or internal in the case of recursion) to the function. Like the program itself, a function is composed of a sequence of statements called the function body. Values can be passed to a function, and the function will return a value.

Key phrases:

> a function is composed of a sequence of statements

A function is a sequence, or an ordered list, of statements. A statement could be many things. It could be an expression, variable definition/assignment or a structure like an if, while, for, or function definition.

> Values can be passed to a function

These values we pass to the function are called the arguments, or actual parameters. The names of the values we take in are the parameters or formal parameters.

```ts
function foo(param0: number, param1: number): void {
  // do something with param0, param1
}

const arg0 = 0;
const arg1 = 1;
foo(arg0, arg1);
```

## First Class Functions

Functions in TS are different from methods in Java. Functions are first-class members of the language. To elaborate, imagine you bought a first-class ticket on a train or plane. As a first-class passenger, you have many amenities available to you. Compared to a lower tier class (second or third-class), you might have a larger seat and more legroom, better entertainment, or higher quality food and beverage. With each lower-tier seating area, you miss out on these features. The same concept applies when discussing members of programming languages. In our example, the passengers in a programming language are the types, values, or operands of the language. The amenities are the types of operations or actions we can take with these passengers.

An example of a first-class member of TS is a number literal. Let's review what we can do with number literals:

We can assign number literals to variables:

```ts
const aNumber = 1;
let anotherNumber = 2;
```

Number literals can be passed as arguments to a function:

```ts
function double(x: number): number {
  return x * 2;
}

double(2); // 4
```

They can be returned on their own:

```ts
function giveMePi(): number {
  return 3.14;
}

giveMePi(); // 3.14
```

Number literals and functions are both first-class members of TypeScript, this means that generally, we can perform the same actions.

We can assign functions to variables:

```ts
function a(): number {
  return 1;
}

const aFunction = a;

const aNumber = aFunction();
```

Functions can be passed as arguments to other functions:

```ts
function double(aFunction: () => number): number {
  return aFunction() * 2;
}

function myFunction(): number {
  return 4;
}

double(myFunction); // 8

// Functions passed as arguments (callbacks) can be used like any other function (call it, pass it arguments, use its result, etc.)

function doubleApply(f: (x: number) => number, x: number): number {
  return f(f(x));
}

function func(x: number): number {
  return x * 2;
}

doubleApply(func, 6); // 24
```

They can be returned on their own:

```ts
function giveMeFoo(): () => number {
  function foo(): number {
    return 1;
  }

  return foo;
}

const aFunction = giveMeFoo(); // A reference to the function that was defined when we ran `giveMeFoo`
const theNumberOne = aFunction(); // The number one
```

## Function Expressions and Anonymous Functions

There are other ways to create functions in TypeScript without using the function definition syntax shown above. You can create nameless functions using function expressions. Function expressions have similar syntax to function definitions; however, we do not specify a name to the function. Instead, sometimes we name the function using a variable.

```ts
const aFunction = function () {};
// ↪'function() {}' is called a function expression.
```

Function expressions are expressions. They are terms that evaluate a value when run. In our case, they evaluate as a reference to an object (more on this later in the course). Which means we can put them anywhere else we would normally put an expression. Such as an argument to another function:

```ts
function foo(func: () => void): void {
  // Take in a parameter `func`
  func(); // Call that parameter (we are assuming that the value of the parameter can be called).
}

foo(function () {
  console.log("Hello, world!");
}); // Create a function and pass its reference to `foo`.

// Output: Hello, world!
```

Notice that we created a function directly inside the argument list when we called foo, we did not name our function in any way. Such a function is called an anonymous function. It is considered anonymous because it does not have a name.
Arrow Functions

You will find that function expressions are extremely helpful tools for generalizing your code. You will find yourself using them frequently. Because of this, the JavaScript standard (ECMAScript 2015) introduced arrow functions as a less cumbersome way of writing function expressions. The first variant of arrow functions keeps the regular syntax for a function body. That is an ordered list of statements.

```ts
// Syntax: ([identifier[, identifier[...]]]) => { statement-list }

const firstArrowFunctionVariant = (x: number, y: number) => {
  return x + y;
};
```

This variant behaves almost identically to a regular function body (the only difference is the `this` binding). You may have zero or as many statements as you like, you can return whenever and whatever. It is merely syntax sugar.

The second variant is more restrictive, but provides cleaner syntax.

```ts
// Syntax: ([identifier[, identifier[...]]]) => expression

const secondArrowFunctionVariant = (x: number, y: number) => x + y;
// ↪'(x, y) => x + y' is the function expression.

secondArrowFunctionVariant(2, 8); // 10
```

Like any other function, you must supply a parameter list (() if no parameters are taken). However, in this variant, you may only have a single expression in the "body" (it's not really a body). This singular expression will be what the function evaluates to when called.

Both of these variants employ a feature that simplify their syntax further. If and only if your arrow function takes in a single parameter, then the parenthesis may be dropped.

```ts
const firstWithoutParens = (x: number) => {
  return x \* 2;
};

const secondWithoutParens = (x: number) => x \* 2;
```

Keep in mind that arrow functions are still function expressions and can be used as such:

```ts
foo(() => {
  console.log("Hello, world!");
});

foo(() => console.log("Hello, world!"));
```

When using arrow functions as arguments to other functions the type decorator can be omitted. As the compiler implicitly understands the type of the arguments.

```ts
function doubleApply(f: (x: number) => number, x: number): number {
  return f(f(x));
}

// The signature of `doubleApply` requires that we pass a function that takes a number and returns a number
// Our arrow function does not need type decorators, as the compiler understands that `y` must be a number.
doubleApply(y => y * 2, 3); // 12
```
