import assert from "assert";
import { SKRSContext2D, createCanvas } from "@napi-rs/canvas";
import open from "open";
import { writeFileSync } from "fs";

/**
 *  Exercise 1: Property Based Testing
 */

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

/**
 * Exercise 2: OOP
 * The following functions should be familiar from lecture.
 * We have slightly modified them to work with TS and our lab setup.
 */

// This function makes the canvas for us to draw on
export function mkContext(w: number, h: number) {
  const canvas = createCanvas(w, h);
  return { canvas, ctx: canvas.getContext("2d") };
}

// You guessed it, this function draws a line to the given canvas.
export function drawLine(ctx: SKRSContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
  ctx.beginPath();
  ctx.strokeStyle = color; // context has many drawing methods
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Same, but this one draws a circle
export function drawCircle(ctx: SKRSContext2D, x: number, y: number, r: number, color: string) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
}

// Here is our Shape type
type Shape = Rect | Circle | Overlay | Rotate | Squash | Composite;

// Don't worry about this.
export function getFileName() {
  const date = new Date();
  const mili = date.getMilliseconds();
  const seconds = date.getSeconds();
  return `include/drawing-${seconds}${mili}.html`;
}

// This function saves the drawing to a html file and opens it in your browser.
export function drawShape(shape: Shape, canvasX: number, canvasY: number) {
  const { canvas, ctx } = mkContext(canvasX, canvasY);
  shape.draw(ctx, "black");
  // Do not worry about the next three lines. You will learn what .then and .catch do later!
  const name = getFileName();
  writeFileSync(name, '<img src="' + canvas.toDataURL() + '" />');
  try {
    open(name).catch(err => console.log(err));
  } catch (e) {}
}

// Class for a rectangle
export class Rect {
  loc: { x: number; y: number };
  width: number;
  height: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.loc = { x: x, y: y };
    this.width = w;
    this.height = h;
  }

  draw(ctx: SKRSContext2D, color: string) {
    const x = this.loc.x;
    const y = this.loc.y;
    const w = this.width;
    const h = this.height;
    drawLine(ctx, x, y, x + w, y, color);
    drawLine(ctx, x + w, y, x + w, y + h, color);
    drawLine(ctx, x + w, y + h, x, y + h, color);
    drawLine(ctx, x, y + h, x, y, color);
  }
}

// For Exercise 2, implement this class.
export class Circle {
  loc: { x: number; y: number };
  radius: number;

  constructor(x: number, y: number, r: number) {
    this.loc = { x: x, y: y };
    this.radius = r;
  }
  draw(ctx: SKRSContext2D, color: string) {
    drawCircle(ctx, this.loc.x, this.loc.y, this.radius, color);
  }
}

// Try testing out your Circle class here! Below is an example of how you might test it.
// First, create a Circle object circle1, with x=80, y=70, and radius=50.
// Then, call drawShape(circle1, 200, 200)
// You can then run this code with npm run start

// Optional: here are some other things to play around with

// Overlay allows us to overlay two shapes
export class Overlay {
  over: Shape;
  under: Shape;
  constructor(shape1: Shape, shape2: Shape) {
    this.over = shape1;
    this.under = shape2;
  }
  draw(ctx: SKRSContext2D, color: string) {
    this.under.draw(ctx, color);
    this.over.draw(ctx, color);
  }
}

// The composite allows us to draw lots of shapes on the same canvas
export class Composite {
  shapes: Shape[];

  constructor() {
    this.shapes = [];
  }
  add(shape: Shape) {
    this.shapes.push(shape);
  }
  draw(ctx: SKRSContext2D, color: string) {
    this.shapes.forEach(s => s.draw(ctx, color));
  }
}

// This class squashes a shape
export class Squash {
  x: number;
  y: number;
  shape: Shape;

  constructor(shape: Shape, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.shape = shape;
  }
  draw(ctx: SKRSContext2D, color: string) {
    ctx.scale(this.x, this.y);
    this.shape.draw(ctx, color);
    ctx.scale(1 / this.x, 1 / this.y); // scale back
  }
}

// Can you guess what this class does?
export class Rotate {
  angle: number;
  shape: Shape;

  constructor(shape: Shape, angle: number) {
    this.angle = angle;
    this.shape = shape;
  }
  draw(ctx: SKRSContext2D, color: string) {
    ctx.rotate(this.angle);
    this.shape.draw(ctx, color);
    ctx.rotate(-this.angle);
  }
}

// Here are some examples of how to use the code. Uncomment blocks to see them show up!

// Here is how you would make and display a rectangle:

// const rec1 = new Rect(50, 50, 50, 50);
// drawShape(rec1, 200, 200);

// Let's overlay a few different shapes:

// drawShape(
//   new Overlay(new Overlay(new Rect(150, 150, 100, 150), new Circle(150, 150, 50)), new Rect(160, 180, 150, 200)),
//   400,
//   400
// );

// Let's squash and overlay some shapes:

// drawShape(
//   new Overlay(
//     new Rotate(new Rect(200, 100, 100, 150), (20 * Math.PI) / 180),
//     new Squash(new Circle(80, 70, 50), 1.5, 3.0)
//   ),
//   400,
//   400
// );
