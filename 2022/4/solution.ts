import { parse } from "../parse.ts";
import type { Puzzle } from "../parse.ts";

const rawPuzzle = await Deno.readTextFile("./input.txt");

const puzzle = parse(rawPuzzle).entries;
// console.log(puzzle);
const p1 = (input: string[][]) => {
  console.log(input);
  const isWithin (amin, amax, bmin, bmax) => {
    if (amin >= bmin && amax <= bmax || bmin >= amin && bmax <= amax) return true
  }
  const splitToBounds = (str) => str.split("-")
  const splitElves = (str) => str.split(",")

};

console.log(p1(puzzle));
