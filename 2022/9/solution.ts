import { parse } from "../parse.ts";
const puzzle = parse(await Deno.readTextFile("./input.txt")).entries;
console.log(puzzle);
