# Bad Practice Guidelines

This document lists common programming patterns that should be avoided. Any code written in this class should not contain any of these bad practices. These guidelines are here to make you a better programmer. Avoiding these devices will help you write more clean, readable, and correct code.

It is okay to ignore cleanliness and use these anti-patterns to get a working solution. But afterwords, you should go back and tune-up your code.

- [Defining Mutable Unchanged Variables](#defining-mutable-unchanged-variables)
- [Defining Unnecessary Variables](#defining-unnecessary-variables)
- [Declaring Variables in the Wrong Scope](#declaring-variables-in-the-wrong-scope)
- [Declaring Variables Far From Relevant Use](#declaring-variables-far-from-relevant-use)
- [Writing Unnecessary Return Checks](#writing-unnecessary-return-checks)
- [Creating Redundant Conditions and Branches](#creating-redundant-conditions-and-branches)
- [Comparing Against Boolean Literals](#comparing-against-boolean-literals)
- [Using Suboptimal Control Structures](#using-suboptimal-control-structures)
- [Using Magical Values](#using-magical-values)

## Defining Mutable Unchanged Variables

Mutability is defined as:

> The characteristic of an object having properties whose values can change while the object itself maintains a unique identity.

A variable can be mutable or immutable (able or unable to change; `let` vs `const`). The majority of the time we use variables to store intermediate values, repeated expressions, or the results of a function call. These variables have names (identifiers) that are bound to these values. More often than not, we intend for these names to pertain to a single value for their entire lifetime.

When declaring a variable, we should default to using `const` rather than `let`. This helps readers understand our code better and protects us, the authors, from accidentally updating a value we did not intend to.

Instead of:

```ts
let PI = 3.14;
let arr = [1, 2, 3];
let result = myFunction();
```

Try:

```ts
const PI = 3.14;
const arr = [1, 2, 3];
const result = myFunction();
```

A common misunderstanding is that `const` makes objects (arrays, maps, sets, plain objects) unable to change. `const` applies to the variable name, not the value associated with that variable. It is a statement that says: "this name will always hold this value". Objects are stored through a reference (distinct from the value), and thus through that reference, we can change the state of an object, even if there is a variable defined with `const` that holds the reference.

```ts
const obj = { x: 1 };

obj.x = 1; // Completely valid
```

## Defining Unnecessary Variables

Variables are useful tools to help keep track of the state. However, like any good tool, we should not overuse them. Make sure your variables have a clear purpose. Functions take expressions as parameters, not variables. Defining a variable just to immediately pass it into a function might not always be optimal. The same principle applies to return statements.

Instead of:

```ts
const m = new Map<string, string>();
for ( /* ... */ ) {
  let x = someFunction();
  anotherFunction(m, x);
}

const a = x + y;
return a;
```

Try this:

```ts
const m = new Map<string, string>();
for ( /* ... */ ) {
  anotherFunction(m, someFunction());
}

return x + y;
```

You now fit more relevant code on a single line - and you are no longer cluttering your scope with variables that are only used a single time. However, sometimes it is helpful to use variables to name parameters or parts of a complex expression. Use your best judgment to decide what would make the function more readable.

## Declaring Variables in the Wrong Scope

In older versions of the C programming language (ANSI C89), variable declarations had to be at the top of the function definition. Otherwise, it would be a compile error:

```c
int do_work() {
  int i = 0;
  int x = 0
  int y = 0;

  for (i = 0; i < 5; i++) {
    x = i % 2; // x is only ever used in this scope,
    // but is declared at the top of the function

    if (x != 0) {
      y += x;
    }
  }

  return y;
}
```

However, JS/TS is not 1989 C, make use of your scopes, and isolate variables relevant to them inside.

```ts
function doWork() {
  let y = 0; // y can be seen in the entire function
  for (let i = 0; i < 5; i++) {
    // i can only be seen in the loop
    const x = i % 2; // x can only be seen in the loop
    if (x !== 0) {
      y += x;
    }
  }

  return y;
}
```

## Declaring Variables Far From Relevant Use

Consider the following example.

```ts
let foo = 0; // foo defined with a meaningless value

let hcf; /* A bunch of code that is irrelevant to foo */
for (let i = 1; i <= number1 && i <= number2; i++) {
  if (number1 % i == 0 && number2 % i == 0) {
    hcf = i;
  }
}
/* End of irrelevant code */

foo = baz(hcf); // relevant use of foo far from its definition
if (foo >= 6) {
  // body
}
```

A variable should be initialized directly to a meaningful and useful value. This should happen as close as possible to its use. Here, the initialization does not affect the later computation, which overwrites the value. The reader is misled and must analyze the first assignment, only to conclude that it serves no purpose. Useless code should be eliminated.

## Writing Unnecessary Return Checks

Sometimes you might want to write:

```ts
function foo() {
  if ( /* case 1 */ ) {
    return true;
  }
  if ( /* case 2 */ ) {
    return true
  }
}

// or

function foo() {
  if ( /* case 1 */ ) {
    return true;
  } else { // case 2 is the logical opposite of case 1
    return false;
  }
}
```

Here we are asking a question, then if that question results in `true`, returning `true` - otherwise returning `false`. Our question (`case 1`) will probably[^1] only ever evaluate as `true` or `false`. Checking what the result is, then immediately returning that result, is redundant. Try this instead:

```ts
function foo() {
  return ( /* case 1 */ ) || ( /* case 2 */ );
}

// or

function foo() {
  return /* case 1 */;
}
```

This also applies to function calls:

```ts
function foo(): boolean {}

function bar() {
  if (foo()) {
    // BAD
    return true;
  }

  return foo(); // GOOD
}
```

[^1] If you find yourself in a case where you have an expression, that you just want to check if it [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy), you can use the [`Boolean` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean).

## Creating Redundant Conditions and Branches

This code snippet has two independent branches. A reader will analyze 2 x 2 = 4 possibilities - each branch being executed or not.

```ts
let foo: boolean;

// First case
if (foo) {
  // body 1
}
if (!foo) {
  // body 2
}

// Second case
if (foo) {
  // body 1
} else if (!foo) {
  // body 2
}
```

In the first case, it is likely that `foo` is not changed in `body 1`. So checking `foo` again is redundant. The second case is similar, the first condition tests `foo`, if the second condition were to execute, it would have already been established that `foo` is not true.

Thus the intent of these two blocks is:

```ts
if (foo) {
  // body 1
} else {
  // body 2
}
```

This is a lot easier to understand as a reader. `foo` is a boolean, there is no need to have another check, if `foo` was not true, then it has to be false.

## Comparing Against Boolean Literals

Sometimes you might want to write:

```ts
let y = 4;
let x = 3;

if ((y < 4 || x < 5) === true) {
}
```

However, both sides of the `===` operator are expressions and will be evaluated when the program runs:

```ts
// 0 Start
if ((y < 4 || x < 5) === true) {
  // body
}
// 1 Evaluate both side of ||
if ((false || true) === true) {
  // body
}
// 2 Evaluate ||
if (true === true) {
  // body
}
// 3 Evaluate ===
if (true) {
  // body
}
// 4 Is "true" truthy? Yes -> Evaluate body. No -> Skip if-statement.
if (true) {
  /* Control goes here */
}
```

But the 3rd step is unnecessary. As the 4th step already checks to see if the result of the if-condition, and we only care about the left side of the `===`. Instead, remove the unnecessary comparison.

```ts
if (y < 4 || x < 5) {
  // body
}
```

This also applies to functions that return boolean values.

```ts
function hasPermission(user: User): boolean {}

if (hasPermission(/* some value */) === true) // BAD
if (hasPermission(/* some value */)) // GOOD
```

## Using Suboptimal Control Structures

Control structures are the syntactic devices we use to manipulate where the [flow of control](https://en.wikipedia.org/wiki/Control_flow) goes. This includes if-statements, [ternary operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), loops (for, while, do-while), switch-statements and others. It is important to be mindful of which structure (or no structure) should be used to solve a problem. You are the architect of a program. Do not waste your time and effort using the suboptimal solution to a problem.

### Conditionals

Simple if-statements can be replaced with ternary operators.

Instead of:

```ts
let x;
if (/* some condition */) {
  x = 5;
} else {
  x = 10;
}

// or

if (/* some condition */) {
  return 5;
} else {
  return 10;
}
```

Try:

```ts
let x = (/* some condition */) ? 5 : 10;

// or

return (/* some condition */) ? 5 : 10;
```

### Loops

If you need to iterate across a range of numbers, use a numeric for-loop. If the list of values is quite small (or specific), you could use `forEach` on an array.

```ts
for (let i = 0; i < 10; i++) {}

[2, 4, 6].forEach(n => {
  /* code with element n */
});
```

for-of loops are similar to the for-each loops in Java. They will iterate over the values of an array (or any iterable object). Be cautious of for-in loops. They will iterate over the indices of an object/array.

```ts
const arr = ["how", "are", "you"];
for (const element of arr) {
  // code with element
  console.log(element);
}
// -> how
// -> are
// -> you

for (const [index, element] of arr.entries()) {
  // arr.entries return an iterator that will return the pairs [0, arr[0]], [1, arr[1]], ...
  // code with both element and index
  console.log(`${index} -> ${element}`);
}
// 0 -> "how"
// 1 -> "are"
// 2 -> "you"
```

Or even better, use a `forEach` if you are using an array (or write a `forEach` for other data structures if needed). If you choose to use this interface, it might be best to avoid modifying the array or any outside variables.

```ts
arr.forEach((element, i) => /* code with element and index i */);
```

## Using Magical Values

Magical constant values that appear inside your code are confusing to read and hard to change. Try and make it easier for your future self when they need to be updated.

Instead of this:

```ts
function isAdmin(userId: string) {
  return ["0", "7365420", "257342015"].includes(userId);
}

// Duration of 24 hours in milliseconds
const oneDay = 86400000;
```

Try this:

```ts
// Using a 'const-assertion' (as const) to tell the compiler we do not want
// our array to be modified.
const ADMIN_USER_IDS = ["0", "7365420", "257342015"] as const;

function isAdmin(userId: string) {
  return ADMIN_USER_IDS.includes(userId);
}

// Duration of 24 hours in milliseconds
const oneDay = 24 * 60 * 60 * 1000;
```
