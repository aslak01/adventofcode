import { parse } from "../parse.ts";
import { isUpperCase } from "../functions.ts";
const rawPuzzle = await Deno.readTextFile("./input.txt");
const puzzle = parse(rawPuzzle).entries;

const splitDataFromInstructions = (puzzle: string[]) => {
  const separatorIndex = puzzle.indexOf("");
  return {
    data: puzzle.slice(0, separatorIndex),
    instructions: puzzle.slice(separatorIndex + 1),
  };
};
const splitPuzzle = splitDataFromInstructions(puzzle);

const deserializeData = (data: string[]) => {
  const removeBrackets = (string: string) =>
    string.replaceAll("[", " ").replaceAll("]", " ");
  const splitByFours = (string: string) => {
    let quadruplet = "";
    const match = string.match(/.{1,4}/g);
    if (match !== null) quadruplet = match;
    return quadruplet;
  };
  const arrs = data
    .map((l) => splitByFours(removeBrackets(l)))
    .map((l) => l.map((e) => e.trim()));
  return arrs;
};
const deserializedData = deserializeData(splitPuzzle.data);
console.log(deserializedData);
console.log(deserializedData.map((l) => l.length));
