import { Color, COLORS, Image } from "../include/image.js";

// Creates a single row image containing the specified colors
function createRow(row: Color[]): Image {
  const img = Image.create(row.length, 1, COLORS.BLACK);

  for (let i = 0; i < row.length; i++) {
    img.setPixel(i, 0, row[i]);
  }

  return img;
}

describe("lineBlur3p", () => {
  it("correctly calculates independent channels", () => {
    const img = createRow([
      [0, 0, 0],
      [100, 0, 10],
      [200, 0, 0],
    ]);

    lineBlur3p(img);

    // red: floor((0 + 100 + 200) / 3) = 100
    // blue: floor((0 + 0 + 0) / 3) = 0
    // green: floor((0, 10, 0) / 3) = 3
    expect(img.getPixel(1, 0)).toEqual([100, 0, 3]);
  });

  // More tests for lineBlur3p go here
});

describe("lineBlur5p", () => {
  // Tests for lineBlur3p go here
});

describe("blurLines", () => {
  // Tests for lineBlur3p go here
});

describe("pixelBlur", () => {
  // Tests for lineBlur3p go here
});

describe("imageBlur", () => {
  // Tests for lineBlur3p go here
});

describe("composeFunctions", () => {
  // Tests for lineBlur3p go here
});

describe("combineThree", () => {
  // Tests for lineBlur3p go here
});
function lineBlur3p(img: Image) {
  throw new Error("Function not implemented.");
}
