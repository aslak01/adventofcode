import { sum } from "../utils";

export function solve_a(input: string): number {
  const parsedInput = parse(input).filter(Boolean);
  const defragmented = defrag(parsedInput.flat());
  return chsum(defragmented);
}

export function solve_b(input: string): number {
  const parsedInput = parse(input).filter(Boolean);
  const defragmented = defrag_entire_files(parsedInput).flat();
  return chsum(defragmented);
}

function parse(input: string): string[][] {
  let fileno = -1;
  return input
    .split("")
    .map(Number)
    .map((n, i) => {
      const isEven = i % 2 === 0;
      if (isEven) fileno++;
      return Array(n).fill(isEven ? `${fileno}` : ".");
    })
    .filter((sec) => sec.length);
}

function defrag(input: string[]): string[] {
  const firstIndexOfDot = input.indexOf(".");
  const lastIndexOfNumber = input.findLastIndex((x) => !isNaN(Number(x)));

  // base case
  if (
    firstIndexOfDot === -1 ||
    lastIndexOfNumber === -1 ||
    firstIndexOfDot > lastIndexOfNumber
  ) {
    return input;
  }

  input[firstIndexOfDot] = input[lastIndexOfNumber];
  input[lastIndexOfNumber] = ".";

  return defrag(input);
}

function defrag_entire_files(
  input: string[][],
  tried: Set<string> = new Set(),
): string[][] {
  const findLastUntried = (idx: number): number => {
    if (idx < 0) return -1;
    const fileKey = `${idx}-${input[idx].join("")}`;
    if (!input[idx].includes(".") && !tried.has(fileKey)) return idx;
    return findLastUntried(idx - 1);
  };

  const findEarliestDotIndex = (
    idx: number,
    fileSize: number,
    lastFileIdx: number,
  ): number => {
    if (idx >= lastFileIdx) return -1;
    if (input[idx][0] === "." && input[idx].length >= fileSize) return idx;
    return findEarliestDotIndex(idx + 1, fileSize, lastFileIdx);
  };

  const lastFileIndex = findLastUntried(input.length - 1);
  if (lastFileIndex === -1) return input;

  const currentFile = input[lastFileIndex];
  const fileKey = `${lastFileIndex}-${currentFile.join("")}`;
  tried.add(fileKey);

  const bestDotIndex = findEarliestDotIndex(
    0,
    currentFile.length,
    lastFileIndex,
  );

  if (bestDotIndex === -1) {
    // if no open position found, continue with next file
    return defrag_entire_files(input, tried);
  }

  const dotArray = input[bestDotIndex];

  input[bestDotIndex] = currentFile;
  input[lastFileIndex] = Array(currentFile.length).fill(".");

  if (dotArray.length > currentFile.length) {
    // persist remaining open section if it was larger than file
    const remainingDots = Array(dotArray.length - currentFile.length).fill(".");
    input.splice(bestDotIndex + 1, 0, remainingDots);
  } else if (dotArray.length === currentFile.length) {
    input[lastFileIndex] = Array(currentFile.length).fill(".");
  }

  return defrag_entire_files(input, tried);
}

function chsum(input: string[]): number {
  return input
    .map(Number)
    .map((n, i) => {
      if (isNaN(n)) return 0;
      return i * n;
    })
    .filter(Boolean)
    .reduce(sum);
}
