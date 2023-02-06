// A user-defined type to represent a function that accepts a generic parameter
export type Observer<T> = (x: T) => void;

// A class to represent updates and subscriptions
export class Observable<T> {
  private observers: Observer<T>[] = [];

  /**
   * Add a function to the set of subscribers
   * @param f A function to be called when an update happens
   */
  subscribe(f: Observer<T>) {
    this.observers.push(f);
  }

  /**
   * Invoke all subscribed functions with an update value
   * @param x An update value
   */
  update(x: T) {
    this.observers.forEach(f => f(x));
  }
}
