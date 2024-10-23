import { snode, Stream, sempty } from "../include/stream.js";

export type Criterion<T> = { name: string; f: (g: T) => boolean };
export type Data = { [key: string]: any };

// Exercise 1
export class FluentFilter<T> {
  data: Data[];

  constructor(data: Data[]) {
    this.data = data;
  }

  filter(crit: Criterion<T>[]): FluentFilter<T> {
    function allCrit(o: Data): boolean {
      return crit.every(c => {
        return c.name in o && c.f(o[c.name]);
      });
    }
    return new FluentFilter<T>(this.data.filter(allCrit));
  }
}

// Exercise 2
export function maxUpTo(s: Stream<number>): Stream<number> {
  function maxUpToHelper(s: Stream<number>, prevMax: number): Stream<number> {
    if (s.isEmpty()) {
      return s;
    }
    const curMax = Math.max(prevMax, s.head());
    return snode(curMax, () => maxUpToHelper(s.tail(), curMax));
  }

  return maxUpToHelper(s, -Infinity);
}

// Exercise 3
export function factorialClosure(): () => number {
  let num = 1;
  let n = 0;
  return () => {
    if (n !== 0 && n !== 1) {
      num = num * n;
    }
    n += 1;
    return num;
  };
}

export function factorialStream(): Stream<number> {
  let num = 1;
  let n = 0;
  function helper(): Stream<number> {
    num += num * n++;
    return snode(num, helper);
  }
  return snode(1, helper);
}
