import { parse } from "../parse.ts";
import type { Puzzle } from "../parse.ts";
import { lowerCase } from "https://deno.land/x/case/mod.ts";

const rawPuzzle = await Deno.readTextFile("./input.txt");

const puzzle = parse(rawPuzzle);
const input = puzzle.entries;

// const points = {
//   win: 6,
//   draw: 3,
//   loss: 0,
//   rock: 1,
//   paper: 2,
//   scissors: 3,
// };

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

const p2p2 = {
  x: "lose",
  y: "draw",
  z: "win",
};

const rps = (a: string, b: string): number => {
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

const winRps = (play: string): string => {
  const w = choices.indexOf(play);
  if (w < 2) return choices[w + 1];
  return choices[0];
};
const loseRps = (play: string): string => {
  const l = choices.indexOf(play);
  if (l > 0) return choices[l - 1];
  return choices[2];
};

const selectionPoints = (b: string) => {
  return choices.indexOf(b) + 1;
};

const parseMatch = (match: string): [string, string] => {
  const play1 = lowerCase(match.split(" ")[0]);
  const play2 = lowerCase(match.split(" ")[1]);
  const a = p1[play1 as keyof typeof p1];
  const b = p2[play2 as keyof typeof p2];
  return [a, b];
};

const scoreMatch = (a: string, b: string) => {
  const playerOutcome = rps(a, b);
  const bonusPoints = selectionPoints(b);
  return playerOutcome + bonusPoints;
};

const pt1 = (input: string[]) => {
  const results = input.map((g: string) => scoreMatch(...parseMatch(g)));
  return results.reduce((a: number, b: number) => a + b, 0);
};

console.log("pt1", pt1(input));

const pt2 = (input: string[]) => {
  const translateObjectiveToPlay = (play: string, objective: string) => {
    if (objective === "draw") return play;
    if (objective === "lose") {
      return loseRps(play);
    }
    return winRps(play);
  };
  const parseMatchP2 = (match: string): [string, string] => {
    const a = lowerCase(match.split(" ")[0]);
    const b = lowerCase(match.split(" ")[1]);
    const play = p1[a as keyof typeof p1];
    const objective = p2p2[b as keyof typeof p2p2];
    const counterPlay = translateObjectiveToPlay(play, objective);
    return [play, counterPlay];
  };
  const results = input.map((g: string) => scoreMatch(...parseMatchP2(g)));
  console.log(results);
  return results.reduce((a: number, b: number) => a + b, 0);
};

console.log("pt2", pt2(input));

const test = ["A Y", "B X", "C Z"];

console.log("pt2test", pt2(test));
