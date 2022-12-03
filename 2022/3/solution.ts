import { parse } from "../parse.ts";
import type { Puzzle } from "../parse.ts";

const rawPuzzle = await Deno.readTextFile("./input.txt");

const puzzle = parse(rawPuzzle);

const p1 = (input: string[]) => {
  console.log(input);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const ALPHABET = upperCase(alphabet);
  console.log(alphabet.length);
};

console.log("p1", p1(puzzle.entries));
