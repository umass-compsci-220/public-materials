import type { Color, Image } from "../include/image.js";

export function lineBlur3p(img: Image, lineNo: number): void {
  // TODO
}

export function lineBlur5p(img: Image, lineNo: number): void {
  // TODO
}

export function blurLines(img: Image, blurLine: (img: Image, lineNo: number) => void): Image {
  // TODO
  return img.copy();
}

export function pixelBlur(img: Image, x: number, y: number): Color {
  // TODO
  return [0, 0, 0];
}

export function imageBlur(img: Image): Image {
  // TODO
  return img.copy();
}

export function composeFunctions(fa: ((p: Color) => Color)[]): (x: Color) => Color {
  // TODO
  return () => [0, 0, 0];
}

export function combineThree(img: Image): Image {
  // TODO
  return img.copy();
}
