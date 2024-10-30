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
export function harmonicClosure(): () => number {
  let n = 1;
  let sum = 0;
  return function () {
    sum += 1 / n++;
    return sum;
  };
}

export function harmonicStream(): Stream<number> {
  let n = 1;
  let sum = 0;
  function helper(): Stream<number> {
    sum += 1 / n++;
    return snode(sum, helper);
  }
  return helper();
}
