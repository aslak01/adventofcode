import { parse } from "../parse.ts";
import { sumArr } from "../functions.ts";

const rawPuzzle = await Deno.readTextFile("./input.txt");

const puzzle = parse(rawPuzzle).entries;

const solve = (input: string[]) => {
  const isWithin = (amin: number, amax: number, bmin: number, bmax: number) => {
    if ((amin >= bmin && amax <= bmax) || (bmin >= amin && bmax <= amax)) {
      return 1;
    }
    return 0;
  };

  const overlaps = (amin: number, amax: number, bmin: number, bmax: number) => {
    if ((amin >= bmin && amin <= bmax) || (bmin >= amin && bmin <= amax)) {
      return 1;
    }
    return 0;
  };

  const splitToBounds = (str: string): number[] =>
    str.split("-").map((n) => Number(n));

  const splitElves = (str: string): string[] => str.split(",");

  const bounds = input.map((elves) => {
    const group = splitElves(elves);
    const elfBounds = group.flatMap(splitToBounds);
    return elfBounds;
  });

  const p1 = bounds.map((grp) => isWithin(...grp));
  const p2 = bounds.map((grp) => overlaps(...grp));

  return [sumArr(p1), sumArr(p2)];
};

console.log("p1, p2", solve(puzzle));
