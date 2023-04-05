import assert from "assert";
import { Observable, Observer } from "../include/observable.js";
import {
  classifyObservables,
  obsStrCond,
  statefulObserver,
  mergeMax,
  merge,
  GreaterAvgObservable,
  SignChangeObservable,
  usingSignChange,
} from "./observables.js";

describe("classifyObservables", () => {
  it("classifies a number observable", () => {
    const o = new Observable<number>();

    const { number } = classifyObservables([o]);
    const spy = jest.fn();
    number.subscribe(spy);

    o.update(1);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  // More tests go here.
});

describe("obsStrCond", () => {
  // More tests go here.
});

describe("statefulObserver", () => {
  // More tests go here.
});

describe("mergeMax", () => {
  // More tests go here.
});

describe("merge", () => {
  // More tests go here.
});

describe("GreaterAvgObservable", () => {
  // More tests go here.
});

describe("SignChangeObservable", () => {
  // More tests go here.
});

describe("usingSignChange", () => {
  // More tests go here.
});
