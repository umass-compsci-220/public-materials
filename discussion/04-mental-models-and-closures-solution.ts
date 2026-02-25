import { rotateRight } from "./lab.js";

describe("rotateRight", () => {
  it("should rotate right by 1", () => {
    expect(rotateRight([1, 2, 3, 4], 1)).toEqual([4, 1, 2, 3]);
  });

  it("should rotate right by 2", () => {
    expect(rotateRight([1, 2, 3, 4], 2)).toEqual([3, 4, 1, 2]);
  });

  it("should return a copy if k = 0", () => {
    const a = [1, 2, 3];
    const b = rotateRight(a, 0);

    expect(b).toEqual([1, 2, 3]);
    expect(b).not.toBe(a);
  });

  it("should return a copy if k equals length", () => {
    const a = [1, 2, 3, 4];
    const b = rotateRight(a, 4);

    expect(b).toEqual([1, 2, 3, 4]);
    expect(b).not.toBe(a);
  });

  it("should behave like k = k % length if k > length", () => {
    expect(rotateRight([1, 2, 3, 4], 6)).toEqual([3, 4, 1, 2]); // 6 % 4 = 2
  });

  it("should not mutate the input array", () => {
    const a = [1, 2, 3, 4];
    rotateRight(a, 1);

    expect(a).toEqual([1, 2, 3, 4]);
  });

  it("should return an empty array for empty input array", () => {
    expect(rotateRight([], 0)).toEqual([]);
    expect(rotateRight([], 10)).toEqual([]);
  });

  it("should handle single element arrays", () => {
    expect(rotateRight([42], 5)).toEqual([42]);
  });

  it("should handle very large k values", () => {
    expect(rotateRight([1, 2, 3, 4], 100)).toEqual(rotateRight([1, 2, 3, 4], 100 % 4));
  });

  it("should work with non-numeric types", () => {
    expect(rotateRight(["a", "b", "c"], 1)).toEqual(["c", "a", "b"]);
  });

  it("should throw an error if k is negative", () => {
    expect(() => rotateRight([1, 2, 3], -1)).toThrow();
  });

  it("should throw if k is a float", () => {
    expect(() => rotateRight([1, 2, 3], 1.5)).toThrow();
  });

  it("should throw if k is a negative float", () => {
    expect(() => rotateRight([1, 2, 3], -1.5)).toThrow();
  });
});
