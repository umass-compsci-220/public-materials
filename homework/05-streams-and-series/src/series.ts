import { sempty, Stream } from "../include/stream.js";

export type Series = Stream<number>;

export function addSeries(s: Series, t: Series): Series {
  // TODO
  return sempty();
}

export function prodSeries(s: Series, t: Series): Series {
  // TODO
  return sempty();
}

export function derivSeries(s: Series): Series {
  // TODO
  return sempty();
}

export function coeff(s: Series, n: number): number[] {
  // TODO
  return [];
}

export function evalSeries(s: Series, n: number): (x: number) => number {
  // TODO
  return () => 0;
}

export function applySeries(f: (c: number) => number, v: number): Series {
  // TODO
  return sempty();
}

export function expSeries(): Series {
  // TODO
  return sempty();
}

export function recurSeries(coef: number[], init: number[]): Series {
  // TODO
  return sempty();
}
