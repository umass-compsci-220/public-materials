import assert from "assert";
import fetchMock from "jest-fetch-mock";
import { getObjsWithName } from "./lab.js";
import { jest } from "@jest/globals";

const SECOND = 1000;
jest.setTimeout(30 * SECOND);

describe("getObjsWithName", () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });

  it("returns empty array if all promises reject", async () => {
    fetchMock.mockReject(new Error("Test"));

    const urls = ["a", "b", "c"];
    const res = await getObjsWithName(urls);

    expect(res).toHaveLength(0);
  });

  it("works if all promises fulfill with an array of objects with name property", async () => {
    const objs = {
      a: [{ name: "a1" }, { name: "a2" }],
      b: [{ name: "b1" }, { name: "b2" }],
      c: [{ name: "c1" }, { name: "c2" }],
    };

    fetchMock.mockImplementation(url => {
      const obj = JSON.stringify(objs[url]);
      return Promise.resolve(new Response(obj));
    });

    const urls = ["a", "b", "c"];
    const res = await getObjsWithName(urls);

    expect(res.every(obj => "name" in obj)).toBe(true);
    expect(res.map(obj => obj["name"])).toEqual(["a1", "a2", "b1", "b2", "c1", "c2"]);
  });

  it("works if all promises fulfill but not all objects have name property", async () => {
    const objs = {
      a: [{ name: "a1" }, { nme: "a2" }, { name: "a3" }],
      b: [{ name: "b1" }],
      c: [{ nam: "c1" }, { n: "c2" }],
    };

    fetchMock.mockImplementation(url => {
      const obj = JSON.stringify(objs[url]);
      return Promise.resolve(new Response(obj));
    });

    const urls = ["a", "b", "c"];
    const res = await getObjsWithName(urls);

    expect(res.every(obj => "name" in obj)).toBe(true);
    expect(res.map(obj => obj["name"])).toEqual(["a1", "a3", "b1"]);
  });

  it("returns empty array if all promises fulfill but objects have no name field", async () => {
    const objs = {
      a: [{ game: "a1" }, { fame: "a2" }],
      b: [{}, { tame: "b1", z: "b2" }],
    };

    fetchMock.mockImplementation(url => {
      const obj = JSON.stringify(objs[url]);
      return Promise.resolve(new Response(obj));
    });

    const urls = ["a", "b"];
    const res = await getObjsWithName(urls);

    expect(res).toHaveLength(0);
  });

  it("works if mix of promises fulfilling and rejecting", async () => {
    const objs = {
      a: [{ name: "a1" }, { name: "a2" }],
      c: [{ name: "c1" }, { name: "c2" }],
    };

    fetchMock.mockImplementation(url => {
      if (["b", "d"].includes(url)) {
        return Promise.reject(new Error("Testing rejecting promise"));
      }
      const obj = JSON.stringify(objs[url]);
      return Promise.resolve(new Response(obj));
    });

    const urls = ["a", "b", "c", "d"];
    const res = await getObjsWithName(urls);

    expect(res.every(obj => "name" in obj)).toBe(true);
    expect(res.map(obj => obj["name"])).toEqual(["a1", "a2", "c1", "c2"]);
  });
});

// Exercise 2: Program Correctness

// Your answer here:
const A = 19;    // Change this value to your answer

// Exercise code starts here:
let n = 0;
let s = A; 
// s = A + oddsum(n)  –  sum of odd numbers less than n 
while (s <= 100) { 
  // s = A + oddsum(n) && s <= 100
  if (n % 2 > 0) { 

    s += n; 

  } else { 

  }

  n = n + 1; 
  // s = A + oddsum(n) 
} 
// n = 20 & A + oddsum(n-1) <= 100 && A + oddsum(n) > 100
