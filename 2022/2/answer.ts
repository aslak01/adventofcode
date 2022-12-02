import { parse } from "../parse.ts";
import type { Puzzle } from "../parse.ts";

const rawPuzzle = await Deno.readTextFile("./input.txt");

const puzzle = parse(rawPuzzle);

console.log(puzzle);
