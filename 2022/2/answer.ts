import { parse } from "../parse.ts";
import type { Puzzle } from "../parse.ts";
import { lowerCase } from "https://deno.land/x/case/mod.ts";

const rawPuzzle = await Deno.readTextFile("./input.txt");

const puzzle = parse(rawPuzzle);

console.log(puzzle);

const points = {
  win: 6,
  draw: 3,
  loss: 0,
  rock: 1,
  paper: 2,
  scissors: 3,
};

const choices = ["rock", "paper", "scissors"];

const p1 = {
  a: "rock",
  b: "paper",
  c: "scissors",
};
const p2 = {
  x: "rock",
  y: "paper",
  z: "scissors",
};

const rps = (a, b): number => {
  if (a === b) return 3;
  const x = choices.indexOf(a);
  const y = choices.indexOf(b);
  if (x == choices.length - 1 && y == 0) {
    return 6;
  }
  if (y == choices.length - 1 && x == 0) {
    return 0;
  }
  if (x > y) {
    return 0;
  } else {
    return 6;
  }
};

const selectionPoints = (b: string) => {
  return choices.indexOf(b) + 1;
};

const parseMatch = (match: string[]) => {
  const a = p1[lowerCase(match[0])];
  const b = p2[lowerCase(match[1])];
  const playerOutcome = rps(a, b);
  const bonusPoints = selectionPoints(b);
  return playerOutcome + bonusPoints;
};

const pt1 = (input: Puzzle) => {
  const arr = input.entries;
  console.log(arr);
  const results = arr.map((g: string[]) => {
    parseMatch(g);
  });
  console.log(results);
  return results.reduce((a: number, b: number) => a + b, 0);
};

console.log(pt1(puzzle));
