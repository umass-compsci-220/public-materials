# Streams and Series

Please download the project [here](../archives/05-streams-and-series.zip).

## Overview

In this assignment, you will work with streams to evaluate power series. Consider the series $𝑠(𝑥) = 𝑎_0 + 𝑎_1𝑥 + 𝑎_2𝑥^2 + \ldots$, we can represent this series by its finite or infinite sequence of coefficients $(a_0, a_1, a_2, ...)$. We will view this sequence as a stream.

### Learning Objectives

- Practice writing and reasoning about streams
- Practice writing and reasoning with recursion

### Student Expectations

Students will be graded on their ability to:

- Correctly implement the functions [specified below](#programming-tasks)
- Resolve all linter warnings
- Follow the [coding](../../guidelines/CODING.md), [bad practice](../../guidelines/BAD_PRACTICES.md) and [testing](../../guidelines/TESTING.md) guidelines
- Design full-coverage [unit-tests](#testing) for the functions they implemented
  - See the [testing guidelines](../../guidelines/TESTING.md#coverage) on coverage for mor details

### Resources

- <https://byjus.com/maths/power-series/>
- <https://byjus.com/maths/multiplying-polynomials/>

## Testing

You must write tests for all your functions, following the principles used so far.

- [Project testing document](../../resources/homework/TESTING.md)
- [Testing guidelines](../../guidelines/TESTING.md)

It may not be obvious how to implement some of the functions. Try writing some tests first.

## Programming Tasks

For all functions below, use streams. A series is represented by a **nonempty stream**, which may be finite or infinite. Compute only as much of the result stream as needed.

1. Write a function `addSeries` that takes two streams of coefficients for the series $s(x)$ and $t(x)$ and returns the stream of coefficients for the sum $s(x) + t(x)$. For example, given $1+2x+3x^2+\ldots$ and $2+6x+9x^2+\ldots$, the result will be $3+8x+12x^2+\ldots$

2. Write a function `prodSeries` that takes two streams of coefficients for the series $s(x)$ and $t(x)$ and returns the stream of coefficients for the product $s(x) ⋅ t(x)$. Review polynomial multiplication. For example, given $1+2x+3x^2+\ldots$ and $2+6x+9x^2+\ldots$, the result will be $2+10x+27x^2+\ldots$

`prodSeries` Hint: Write one of the series as $𝑠(𝑥) = 𝑎_0 + 𝑥 𝑠_1(𝑥)$, where $s_1(x)$ is another series. Then use distributivity to multiply $s(x) ⋅ t(x)$ and map all operations to streams (how can you represent multiplying with $x$?). Delay the recursive computation of the result’s tail until needed.

3. Write a function `derivSeries` that takes a stream of coefficients for the series $s(x)$, and returns a stream of coefficients for the derivative $s^\prime(x)$. For example, given $1+2x+3x^2+\ldots$ the result will be $2+6x+\ldots$

4. Write a function `coeff` that takes a stream of coefficients for the series $s(x)$ and a natural number $n$, and returns the array of coefficients of $s(x)$, up to and including that of order (degree) $n$. If the stream has fewer coefficients, return as many as there are.

5. Write a function `evalSeries` that takes a stream of coefficients for the series $s(x)$, and a natural number $n$, and returns a closure. When called with a real number $x$, this closure will return the sum of all terms of $s(x)$ up to and including the term of degree $n$.

6. Write a function `applySeries` that takes a function `f` and a value `v` and returns the stream representing the infinite series $s(x)$ where $a_0 = v$, and $a_{k + 1}= f(a_k)$, for all $k ≥ 0$.

7. Write a function `expSeries` with no arguments that returns the Taylor series for $e^x$, i.e., the
   coefficients are $a_k = 1/k!$ You may use `applySeries` with an appropriate closure.

8. Write a function `recurSeries`, taking two arrays, `coef` and `init`, assumed of equal positive length $k$, with `coef` = $[c_0, c_1, \ldots, c_{k-1}]$. The function should return the infinite stream of values $a_i$ given by a k-order recurrence: the first $k$ values are given by init: $[a_0, a_1, \ldots, a_{k-1}]$; the following values are given by the relation $a_{n+k} = c_0 a_n + c_1 a_{n+1} + \ldots + c_{k-1} a_{n+k-1}$ for all $n ≥ 0$.

`recurSeries` Hint: Derive the formula for $a_{n + k}$ when $n = 0$ and $n = 1$.
