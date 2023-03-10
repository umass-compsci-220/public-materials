import { Color, COLORS, Image } from "../include/image.js";
import { lineBlur3p } from "./moreImageProcessing.js";
// Creates a single row image containing the specified colors
function createRow(row: Color[]): Image {
  const img = Image.create(row.length, 1, COLORS.BLACK);

  for (let i = 0; i < row.length; i++) {
    img.setPixel(i, 0, row[i]);
  }

  return img;
}

// Checks to see if a color is equal to another one with an error of 1 (default)
function expectColorToBeCloseTo(actual: Color, expected: Color, error = 1) {
  [0, 1, 2].forEach(i => expect(Math.abs(actual[i] - expected[i])).toBeLessThanOrEqual(error));
}

describe("lineBlur3p", () => {
  it("correctly calculates independent channels", () => {
    const img = createRow([
      [0, 0, 0],
      [100, 0, 10],
      [200, 0, 0],
    ]);

    lineBlur3p(img, 0);

    // red: floor((0 + 100 + 200) / 3) = 100
    // blue: floor((0 + 0 + 0) / 3) = 0
    // green: floor((0 + 10 + 0) / 3) = 3
    expectColorToBeCloseTo(img.getPixel(1, 0), [100, 0, 3]);
  });

  // More tests for lineBlur3p go here
});

describe("lineBlur5p", () => {
  // Tests for lineBlur5p go here
});

describe("blurLines", () => {
  // Tests for blurLines go here
});

describe("pixelBlur", () => {
  // Tests for pixelBlur go here
});

describe("imageBlur", () => {
  // Tests for imageBlur go here
});

describe("composeFunctions", () => {
  // Tests for lineBlur3p go here
});

describe("combineThree", () => {
  // Tests for lineBlur3p go here
});
