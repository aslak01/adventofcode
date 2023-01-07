import { parse } from "../functions.ts";
const puzzle = parse(await Deno.readTextFile("./input.txt"));

import { range, uniq } from "https://x.nest.land/rambda@7.5.0/mod.ts";

const lineParse = (line: string): [number, number][] =>
  line.split("->").map((c) => c.trim().split(",").map((n) => Number(n))) as [
    number,
    number,
  ][];

const pPuzzle = puzzle.map(lineParse);

function findExtents(coords: number[][][]): [number, number, number, number] {
  return coords.reduce((extents, coordArray) => {
    coordArray.forEach(([x, y]) => {
      extents[0] = Math.min(extents[0], x);
      extents[1] = Math.min(extents[1], y);
      extents[2] = Math.max(extents[2], x);
      extents[3] = Math.max(extents[3], y);
    });
    return extents;
  }, [Infinity, Infinity, -Infinity, -Infinity]);
}

const extents = findExtents(pPuzzle);
// min X, min Y, max X, max Y
const rangeX = range(0, extents[2] - extents[0] + 1);
const rangeY = range(0, extents[3] + 1);

const plotLine = (
  line: [number, number][],
) => {
  const l = [];
  for (const [i] of line.entries()) {
    if (typeof line[i + 1] === "undefined") continue;
    const x1 = Math.min(line[i][0] - extents[0], line[i + 1][0] - extents[0]);
    const x2 = Math.max(line[i][0] - extents[0], line[i + 1][0] - extents[0]);
    const y1 = Math.min(line[i][1], line[i + 1][1]);
    const y2 = Math.max(line[i][1], line[i + 1][1]);
    if (x1 == x2) uniq(range(y1, y2 + 1).map((c) => l.push([x1, c])));
    else uniq(range(x1, x2 + 1).map((c) => l.push([c, y1])));
  }
  return l;
};

const walls = uniq(pPuzzle.map(plotLine).flat());

const origin = 500 - extents[0];

const genMatrix = (
  rX: number[],
  rY: number[],
  walls: [number, number][],
  sandOrigin: [number, number],
  sands: [number, number][],
  sandPos: [number, number] | null = null,
  labels = false,
) => {
  const wls = JSON.stringify(walls);
  let matrix = "";
  let hasFallingSand = false;
  if (labels) matrix += "   " + rangeX.join(" ") + "\n";
  for (const y of rY) {
    const row = [];
    for (const x of rX) {
      const current = JSON.stringify([x, y]);
      if (sandPos === null) {
        sandPos = sandOrigin;
        const wallBelow = wls.includes(JSON.stringify([x, y + 1]));
      } // if (current === JSON.stringify([sandOrigin, 0])) row.push("+");
      else if (wls.includes(current)) row.push("#");
      else row.push(" ");
    }
    if (labels) {
      const index = y < 100 ? y < 10 ? "  " + y : " " + y : y;
      matrix += index + " " + row.join("   ") + "\n";
    } else {
      matrix += row.join("") + (y === extents[3] ? "  " : "\n");
    }
  }
  return matrix;
};

const matr = genMatrix(rangeX, rangeY, walls);
// console.clear();
console.log(matr);
console.log("indexof first newline", matr.indexOf("\n"));
console.log("extents x", extents[2] - extents[0]);
console.log(
  "matr.length / 94",
  matr.length / 95,
  "(94 = x len + backslash and n?)",
);
console.log("extents y", extents[3], "extra line from trailing newline?");
console.log(extents);

const movingSand = (matrix: string) => {
  const sand = "o";
};

// animating matrix in terminal credit openai
// let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// function printMatrix(matrix) {
//   for (let row of matrix) {
//     console.log(row.join(" "));
//   }
// }

// setInterval(() => {
//   matrix.unshift(matrix.pop());
//   console.clear();
//   printMatrix(matrix);
// }, 1000);
