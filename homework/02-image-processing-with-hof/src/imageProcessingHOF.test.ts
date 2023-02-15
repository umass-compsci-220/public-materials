import assert from "assert";
import { COLORS, Image } from "../include/image.js";
import { imageMapCoord } from "./imageProcessingHOF.js";

describe("imageMapCoord", () => {
  function identity(img: Image, x: number, y: number) {
    return img.getPixel(x, y);
  }

  it("should return a different image", () => {
    const input = Image.create(10, 10, COLORS.WHITE);
    const output = imageMapCoord(input, identity);
    assert(input !== output);
  });

  // More tests for imageMapCoord go here.
});

describe("imageMapIf", () => {
  // More tests for imageMapIf go here
});

describe("mapWindow", () => {
  // More tests for mapWindow go here
});

describe("makeBorder", () => {
  // More tests for makeBorder go here
});

describe("dimCenter", () => {
  // More tests for dimCenter go here
});

describe("isGrayish", () => {
  // More tests for isGrayish go here
});

describe("makeGrayish", () => {
  // More tests for makeGrayish go here
});
