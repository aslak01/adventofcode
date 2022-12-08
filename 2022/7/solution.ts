import { parse } from "../parse.ts";
const rawPuzzle = await Deno.readTextFile("./input.txt");
const puzzle = parse(rawPuzzle).entries;

const example = parse(await Deno.readTextFile("./example.txt")).entries;

console.log(example);
