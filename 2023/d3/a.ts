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

function accNumWithIndex(
  row: string[],
  c: number,
  r: number,
  sum = "",
  idxs: number[] = [],
) {
  const curr = row[c];
  const next = row[c + 1];
  if (!num(next)) {
    const ixs = [...idxs, c];
    const numCoords = ixs.map((cl) => `${r},${cl}`);
    return { value: Number(sum + curr), coords: numCoords };
  }
  return accNumWithIndex(row, c + 1, r, sum += curr, [...idxs, c]);
}

function iter(
  matrix: string[][],
  r: number = 0,
  c: number = 0,
  visitedIndices: Set<string> = new Set(),
  symbolCoords: Set<string> = new Set(),
  foundNums: { value: number; coords: string[] }[] = [],
) {
  if (r >= matrix.length) {
    const matchingNums = foundNums.filter(({ coords }) =>
      coords.some((coord) => {
        return hasSurroundingSymbol(
          matrix,
          +coord.split(",")[0],
          +coord.split(",")[1],
          symbolCoords,
        );
      })
    );
    return matchingNums.reduce((acc, curr) => acc + curr.value, 0);
  }

  if (c >= matrix[r].length) {
    return iter(matrix, r + 1, 0, visitedIndices, symbolCoords, foundNums);
  }

  const key = `${r},${c}`;
  if (!visitedIndices.has(key)) {
    if (symb(matrix[r][c])) {
      symbolCoords.add(key);
    }
    if (num(matrix[r][c])) {
      const result = accNumWithIndex(matrix[r], c, r);
      result.coords.map((idx) => visitedIndices.add(idx));
      foundNums.push(result);
    }
  }
  return iter(matrix, r, c + 1, visitedIndices, symbolCoords, foundNums);
}

function hasSurroundingSymbol(
  matrix: string[][],
  r: number,
  c: number,
  symbolCoords: Set<string>,
): boolean {
  const directions = [
    { row: r - 1, col: c }, // up
    { row: r + 1, col: c }, // down
    { row: r, col: c - 1 }, // left
    { row: r, col: c + 1 }, // right
    { row: r - 1, col: c - 1 }, // top-left
    { row: r - 1, col: c + 1 }, // top-right
    { row: r + 1, col: c - 1 }, // bottom-left
    { row: r + 1, col: c + 1 }, // bottom-right
  ];

  for (const dir of directions) {
    if (
      isValidPosition(dir.row, dir.col, matrix) &&
      symbolCoords.has(`${dir.row},${dir.col}`)
    ) {
      return true;
    }
  }

  return false;
}

function isValidPosition(
  row: number,
  col: number,
  matrix: string[][],
): boolean {
  return row >= 0 && row < matrix.length && col >= 0 &&
    col < matrix[row].length;
}
