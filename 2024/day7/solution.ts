import { filterByReference, map, pipe, sum } from "../utils/index.ts";

type Input = {
  result: number;
  inputs: number[];
};

const splitPuzzle = pipe<string, Input[]>(
  (s: string) => s.split("\n"),
  map((ln: string) => ln.split(":")),
  map(parseLine),
);

function parseLine([result, inputs]: string[]): Input {
  return {
    result: Number(result),
    inputs: inputs.trim().split(" ").map(Number),
  };
}

export function solve_a(input: string): number {
  const puzzle = splitPuzzle(input);
  const solutions = puzzle.map((eq) => findPossibleEquations(eq));
  const possibleSolutions = filterByReference(puzzle, solutions);
  return sum(possibleSolutions.map((equation) => equation.result));
}

export function solve_b(input: string): number {
  const puzzle = splitPuzzle(input);
  const solutions = puzzle.map((eq) => findPossibleEquations(eq, true));
  const possibleSolutions = filterByReference(puzzle, solutions);
  return sum(possibleSolutions.map((equation) => equation.result));
}

function findPossibleEquations(
  input: Input,
  allowConcat = false,
): string | undefined {
  function tryConcat(
    target: number,
    last: number,
    rest: number[],
    digits: number,
  ): string | undefined {
    if (digits > target.toString().length) return;
    const div = Math.pow(10, digits);
    if (target % div === last) {
      const concatTarget = Math.floor(target / div);
      const concatResult = recurse(rest, concatTarget);
      if (concatResult) return `${concatResult} . ${last}`;
    }
    return tryConcat(target, last, rest, digits + 1);
  }

  function recurse(nums: number[], target: number): string | undefined {
    if (nums.length === 1) {
      return nums[0] === target ? nums[0].toString() : undefined;
    }
    const n = nums.length;
    const last = nums[n - 1];
    const rest = nums.slice(0, -1);

    const addResult = recurse(rest, target - last);
    if (addResult) return `${addResult} + ${last}`;

    if (last !== 0 && target % last === 0) {
      const mulResult = recurse(rest, target / last);
      if (mulResult) return `${mulResult} * ${last}`;
    }

    return allowConcat ? tryConcat(target, last, rest, 1) : undefined;
  }

  return recurse(input.inputs, input.result);
}
