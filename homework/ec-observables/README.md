# Observables

Please download the project [here](../archives/ec-observables.zip).

## Overview

In this assignment, you will work with observables.

### Learning Objectives

- Practice writing and reasoning about observables and observers

### Student Expectations

Students will be graded on their ability to:

- Correctly implement the functions [specified below](#programming-tasks)
- Follow the [coding](../../guidelines/CODING.md), [bad practice](../../guidelines/BAD_PRACTICES.md), and [testing](../../guidelines/TESTING.md) guidelines
- Design full-coverage [unit-tests](#testing) for the functions they implemented


## Programming Tasks

For all functions below, use the provided Observable class.

1. Write a function `classifyObservers` that takes in an array `obsArr` of Observables where each Observable updates with a type `string`, `number`, or  `boolean`. Return an object with three observables, one for each named type. Each of the three observables updates anytime an Observable of that type in the input array updates.

2. Write a function `obsStrCond` that takes a nonempty array `funcArr` of functions with type `string => string`, a function f with type `string => boolean`, and an Observable `o` with type `Observable<string>`. It returns an `Observable<string>` that updates when `o` updates, in the following way. If `f` returns true for the string obtained by applying the composition of the functions in `funcArr` (with the function at index 0 being applied first) to the update value of `o`, then the returned observable should update with that string. If `f` returns false, update the returned observable with the unchanged update value of `o`.

3. Write a function `statefulObserver` that takes an `Observable<number>` `o` as input and returns a new `Observable<number>` which only updates if the current update value from `o` is divisible by the previous update value from `o`.

## Optional Programming Tasks

The following questions were taken directly from past exams and do not count for credit. They are provided for additional practice only. Their tests on gradescope are fully public, but do not count for credit. The solutions are available in the corresponding exam solutions on moodle.

1. [FALL 2022 MIDTERM 2] Write a function `mergeMax` that takes two Observables `o1` and `o2` with type `Observable<number>`, subscribes functions to each, and returns a new Observable which updates its subscribers whenever it receives a value which is no smaller than any value received so far from o1 or o2. Subscribers should be sent objects of the type { obs: number, v: number }, where v is the value received, and obs is either 1 or 2, indicating the source of the value.

2. [SPRING 2022 FINAL EXAM] Write a function `merge(o1: Observable<string>, o2: Observable<string>): Observable<string>` returning a new `Observable<string>` which, whenever either o1 or o2 are updated, will be updated with the same value.

3. [SPRING 2022 MIDTERM 2] Consider the Observable class from lecture, receiving updates with positive values. Implement a method `greaterAvg` returning a new `Observable<number>` that is updated with every number that is at least 50% larger than the average of the previous two number. Hint: use `this`.

4. [FALL 2021 FINAL EXAM] Consider the Observable class provided in observable.ts, receiving updates with numeric values. In observables.ts implement a method `signChange()` that returns a new `Observable<number>` which will be updated with every nonzero value v that is not preceded by a nonzero value of the same sign. Hint: use `this`.

    - Write a function `usingSignChange` that takes an array of numbers `numArr` and an observer function `f`. You should subscribe `f` to the observer returned by the `signChange` method and then update the observer returned by `SignChangeObservable` with every number in `numArr` starting at index 0. The function should return nothing.


## Testing

You must write tests for all your functions, following the principles used so far.

- [Project testing document](../../resources/homework/TESTING.md)
- [Testing guidelines](../../guidelines/TESTING.md)
