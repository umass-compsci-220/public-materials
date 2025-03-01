interface MyIterator<T> {
  hasNext: () => boolean;
  next: () => T;
}

// Exercise 1: Iterators
export function concatIt<T>(it1: MyIterator<T>, it2: MyIterator<T>) {
  return {  
    hasNext() { return it1.hasNext() || it2.hasNext() },
    next() { return it1.hasNext() ? it1.next() : it2.next() }
  };
}


// Exercise 2: Mental Models (no Gradescope)
const mkList = <T>(init: T, f: (x: T) => T) => ({
  next: () => mkList(f(init), f),
  value: () => init,
});
let cnt = 0;
const a = [mkList(0, x => x + 1), mkList(cnt, _ => ++cnt)];
const b = a.map(lst => lst.next().next());
console.log(b[1].value());


// Exercise 3: More Iterators
export function prependIt<T>(v: T, it2: MyIterator<T>): MyIterator<T> {
  let firstSeen = true;
  return {
    hasNext: () => firstSeen || it2.hasNext(),
    next: () => {
      if(firstSeen) {
        firstSeen = false
        return v
      }
      return it2.next()
    }
  }
}