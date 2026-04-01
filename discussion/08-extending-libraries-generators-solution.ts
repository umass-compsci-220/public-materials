class Polygon {
  constructor(private vertices: [number, number][]) {
    this.vertices = vertices;
  }

  public makeIterator(): IterableIterator<number[]> {
    return this.vertices[Symbol.iterator]();
  }
}

/**
 * EXERCISE 1
 *
 * Implement a CenteredPolygon class that has a `center()` method.
 * The method returns the average vertex of the polygon.
 * Note that you cannot access the private `vertices` property of Polygon directly;
 * you must use `makeIterator()`
 */
export class CenteredPolygon extends Polygon {
  public center(): number[] {
    const vertIterator = this.makeIterator();
    let x = 0,
      y = 0;

    let count = 0;
    for (const vert of vertIterator) {
      x += vert[0];
      y += vert[1];
      count++;
    }

    return [x / count, y / count];
  }
}

/**
 * EXERCISE 2
 *
 * Implement a generator (chainGenerator) for the ChainIterator problem. It should behave the same way as ChainIterator from last week's lab.
 * This means chainGenerator should take in an array of iterables. It should then yield items from the first iterable until it runs out.
 * Then, it should yield items from the next iterable in the given array, repeating this process until reaching the end of the array of
 * iterables. You may assume the given array is not empty.
 *
 */

export function* chainGenerator<T>(iterables: Iterable<T>[]): Generator<T> {
  for (const iterable of iterables) {
    for (const item of iterable) {
      yield item;
    }
  }
}
