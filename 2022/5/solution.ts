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

// console.log(splitPuzzle);

const deserializeData = (data: string[]) => {
  const removeBrackets = (string: string) =>
    string.replaceAll("[", " ").replaceAll("]", " ");
  const splitByFours = (string: string) => {
    // typescript bullshit coming up
    let triplet = "";
    const match = string.match(/.{1,4}/g);
    if (match !== null) triplet = match as unknown as string;
    return triplet;
  };
  const splitData = data.map((l) => splitByFours(removeBrackets(l)));
  const whiteSpaceRemovedSplitData = splitData.map((l) =>
    l.map((e) => e.trim())
  );
  const indexesRemoved = whiteSpaceRemovedSplitData.slice(
    0,
    whiteSpaceRemovedSplitData.length - 1,
  );
  return indexesRemoved;
};
const deserializedData = deserializeData(splitPuzzle.data);
console.log(deserializedData);
console.log(deserializedData.map((l) => l.length));
