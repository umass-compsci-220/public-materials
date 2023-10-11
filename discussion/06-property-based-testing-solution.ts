import assert from "assert";

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
