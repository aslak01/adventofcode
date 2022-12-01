import { parse } from "../parse.ts";
import type { Puzzle } from "../parse.ts";

const rawPuzzle = await Deno.readTextFile("./input.txt");

const puzzle = parse(rawPuzzle);

const answer = (input: Puzzle): number[] => {
  const arrays = input.blocks;
  const sums = arrays.map((arr) =>
    arr.reduce((a, b) => Number(a) + Number(b), 0)
  );
  return sums
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 1);
};

console.log(answer(puzzle));

const answer2 = (input: Puzzle): number => {
  const arrays = input.blocks;
  const sums = arrays.map((arr) =>
    arr.reduce((a, b) => Number(a) + Number(b), 0)
  );
  const top = sums
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 3);

  return top.reduce((a, b) => a + b, 0);
};

console.log(answer2(puzzle));
