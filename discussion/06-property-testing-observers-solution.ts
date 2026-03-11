import assert from "assert";

/**
 *  Exercise 1: Property Based Testing
 */

function randomPositiveInteger() {
  return Math.floor(Math.random() * 1000 + 1);
}

export function oracle(genArray: (num: number) => number[][]) {
  const num_tests = 5;
  for (let i = 0; i < num_tests; ++i) {
    const n = randomPositiveInteger();
    const a = genArray(n);
    const valid = (x: number) => x % 1 === 0 && 0 <= x && x < n;

    function isPerm(p: number[]) {
      assert(p.length === n, "length is n");
      assert(p.every(valid), "valid numbers");
      const f = Array(n).fill(1);
      assert(p.every(e => --f[e] === 0));
    }

    assert(a.length === n, "array has n rows");
    a.forEach(isPerm); // Each row is a permutation
    for (let k = 0; k < n; ++k) {
      isPerm(a.map(r => r[k])); // Each column is a permutation
    }
  }
}

////////// Observers ///////////

export type Coordinate = { x: number; y: number };

export interface MouseObserver {
  readonly screen: number;

  // update observer with new mouse click coordinate
  update_coordinate(coord: Coordinate): void;

  // update observer with new mouse drag event
  update_drag(start: Coordinate, end: Coordinate): void;
}

export interface MouseSubject {
  // adds an Observer to the set of subscribers
  subscribe(subscriber: MouseObserver): void;

  // removes an Observer from the set of subscribers
  unsubscribe(subscriber: MouseObserver): void;
}

// Exercise 2

export class MouseEvents implements MouseSubject {
  private _num_screens: number;
  private _subscribers: Set<MouseObserver>[];

  constructor(num_screens: number) {
    this._num_screens = num_screens;
    this._subscribers = [];
    for (let i = 0; i < num_screens; i++) {
      const new_set = new Set<MouseObserver>();
      this._subscribers.push(new_set);
    }
  }

  private _is_valid_screen(screen: number): boolean {
    return screen >= 0 && screen < this._num_screens;
  }

  private _change_subscribers(subscriber: MouseObserver, change_subscriber_set: (s: Set<MouseObserver>) => void): void {
    if (this._is_valid_screen(subscriber.screen)) {
      change_subscriber_set(this._subscribers[subscriber.screen]);
    }
  }

  subscribe(subscriber: MouseObserver): void {
    this._change_subscribers(subscriber, (s: Set<MouseObserver>) => s.add(subscriber));
  }

  unsubscribe(subscriber: MouseObserver): void {
    this._change_subscribers(subscriber, (s: Set<MouseObserver>) => s.delete(subscriber));
  }

  private _broadcast_to_subscribers(screen: number, update_subscriber: (x: MouseObserver) => void): void {
    if (this._is_valid_screen(screen)) {
      for (const subscriber of this._subscribers[screen]) {
        update_subscriber(subscriber);
      }
    }
  }

  mouse_click(screen: number, coord: Coordinate): void {
    this._broadcast_to_subscribers(screen, (x: MouseObserver) => x.update_coordinate(coord));
  }

  mouse_drag(screen: number, start: Coordinate, end: Coordinate): void {
    this._broadcast_to_subscribers(screen, (x: MouseObserver) => x.update_drag(start, end));
  }
}

