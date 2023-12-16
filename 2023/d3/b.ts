import { input } from "./input.ts";
import { test } from "./test-a.ts";

const isTest = Bun.argv[2];

function main() {
  const data = isTest ? test : input;
  const matrix = data.map((l) => l.split(""));
  const answer = iter(matrix);
  console.log(answer);
}
main();

function symb(x: string) {
  return isNaN(Number(x)) && x !== ".";
}
function num(x: string): boolean {
  return !isNaN(Number(x));
}

function iter(
  matrix: string[][],
  r = 0,
  c = 0,
  visitedIndices: Set<string> = new Set(),
  starPositions: Set<string> = new Set(),
  foundNums = [],
) {
  if (r >= matrix.length) {
    const transformedNums = foundNums.map((n) => ({
      ...n,
      coords: n.coords.map((c: string) => c.split(",").map(Number)),
    }));
    const numberCoords = transformedNums.flatMap((n) => n.coords);

    const doubles = Array.from(starPositions).map((c) =>
      c.split(",").map(Number)
    );
    const found = doubles.map((s) =>
      checkSurrounding(s, transformedNums, matrix)
    ).filter(Boolean);

    const factored = found.map((n) => n[0] * n[1]);
    return factored.reduce((sum, val) => sum + val, 0);
  }

  if (c >= matrix[r].length) {
    return iter(
      matrix,
      r + 1,
      0,
      visitedIndices,
      starPositions,
      foundNums,
    );
  }

  const key = `${r},${c}`;
  if (!visitedIndices.has(key)) {
    if (matrix[r][c] === "*") {
      starPositions.add(key);
    } else if (num(matrix[r][c])) {
      const result = accNumWithIndex(matrix[r], c, r);
      console.log(`Value: ${result.value}, coords: ${result.coords}`);

      if (result.value > 0) {
        result.coords.forEach((idx) => visitedIndices.add(idx));
        foundNums.push({ ...result });
      }
    }
  }

  return iter(
    matrix,
    r,
    c + 1,
    visitedIndices,
    starPositions,
    foundNums,
  );
}

function accNumWithIndex(
  row: string[],
  c: number,
  r: number,
  sum = "",
  idxs = [],
) {
  const curr = row[c];
  const next = row[c + 1];

  if (!num(next)) {
    const ixs = [...idxs, c];
    const numCoords = ixs.map((cl) => `${r},${cl}`);
    return { value: Number(sum + curr), coords: numCoords };
  }

  return accNumWithIndex(row, c + 1, r, sum + curr, [...idxs, c]);
}

type Gear = {
  value: number;
  coords: number[][];
};

function checkSurrounding(
  starCoord: number[],
  gears: Gear[],
  matrix: string[][],
) {
  function generateSurr(coord: number[], matrix: string[][]) {
    const directions = [
      { row: -1, col: 0 }, // up
      { row: 1, col: 0 }, // down
      { row: 0, col: -1 }, // left
      { row: 0, col: 1 }, // right
      { row: -1, col: -1 }, // top-left
      { row: -1, col: 1 }, // top-right
      { row: 1, col: -1 }, // bottom-left
      { row: 1, col: 1 }, // bottom-right
    ];
    let surr = [];
    for (const direction of directions) {
      const newRow = coord[0] + direction.row;
      const newCol = coord[1] + direction.col;
      const surrPos = [newRow, newCol];
      if (isValidPosition(newRow, newCol, matrix)) {
        surr.push(surrPos);
      }
    }
    return surr;
  }

  const starSurroundings = generateSurr(starCoord, matrix);
  console.log(starSurroundings);

  let foundGears = [];
  for (const coord of starSurroundings) {
    foundGears = compareCoordinate(coord, gears);

    if (foundGears?.length === 2) {
      console.log(foundGears);
      return foundGears.map((g) => g.value);
    }
  }

  function compareCoordinate(coord: number[], gears: Gear[]) {
    const found: Gear[] = [];

    for (const gear of gears) {
      if (
        gear.coords.some((c) =>
          starSurroundings.some((s) => c[0] === s[0] && c[1] === s[1])
        )
      ) {
        found.push(gear);
      }
    }

    if (found.length === 2) {
      return found;
    }
  }
  return foundGears;
}

function isValidPosition(
  row: number,
  col: number,
  matrix: string[][],
): boolean {
  return row >= 0 && row < matrix.length && col >= 0 &&
    col < matrix[0].length;
}
