import type { Image, Color } from "../include/image.js";

export function imageMapCoord(img: Image, func: (img: Image, x: number, y: number) => Color): Image {
  // TODO
  return img.copy();
}

export function imageMapIf(
  img: Image,
  cond: (img: Image, x: number, y: number) => boolean,
  func: (p: Color) => Color
): Image {
  // TODO
  return img.copy();
}

export function mapWindow(
  img: Image,
  xInterval: number[], // Assumed to be a two element array containing [x_min, x_max]
  yInterval: number[], // Assumed to be a two element array containing [y_min, y_max]
  func: (p: Color) => Color
): Image {
  // TODO
  return img.copy();
}

export function makeBorder(img: Image, thickness: number, func: (p: Color) => Color): Image {
  // TODO
  return img.copy();
}

export function dimCenter(img: Image, thickness: number): Image {
  // TODO
  return img.copy();
}

export function isGrayish(p: Color): boolean {
  // TODO
  return true;
}

export function makeGrayish(img: Image): Image {
  // TODO
  return img.copy();
}
