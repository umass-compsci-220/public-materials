import { Observable, Observer } from "../include/observable.js";

// Extra Credit Functions

export function classifyObservables(obsArr: (Observable<string> | Observable<number> | Observable<boolean>)[]): {
  string: Observable<string>;
  number: Observable<number>;
  boolean: Observable<boolean>;
} {
  // TODO: Implement this function
  return { string: new Observable(), number: new Observable(), boolean: new Observable() };
}

export function obsStrCond(
  funcArr: ((arg1: string) => string)[],
  f: (arg1: string) => boolean,
  o: Observable<string>
): Observable<string> {
  // TODO: Implement this function
  return new Observable<string>();
}

export function statefulObserver(o: Observable<number>): Observable<number> {
  // TODO: Implement this function
  return new Observable();
}

// Optional Additional Practice

export function mergeMax(o1: Observable<number>, o2: Observable<number>): Observable<{ obs: number; v: number }> {
  // TODO: Implement this function
  return new Observable();
}

export function merge(o1: Observable<string>, o2: Observable<string>): Observable<string> {
  // TODO: Implement this function
  return new Observable();
}

export class GreaterAvgObservable extends Observable<number> {
  constructor() {
    super();
  }

  greaterAvg(): Observable<number> {
    // TODO: Implement this method
    return new Observable();
  }
}

export class SignChangeObservable extends Observable<number> {
  constructor() {
    super();
  }

  signChange(): Observable<number> {
    // TODO: Implement this method
    return new Observable();
  }
}

/**
 * This function shows how the class you created above could be used.
 * @param numArr Array of numbers
 * @param f Observer function
 */
export function usingSignChange(numArr: number[], f: Observer<number>) {
  // TODO: Implement this function
}
