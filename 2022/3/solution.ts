import { parse } from "../parse.ts";

import { upperCase } from "https://deno.land/x/case/mod.ts";
const rawPuzzle = await Deno.readTextFile("./input.txt");

const puzzle = parse(rawPuzzle);

const p1 = (input: string[]) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const ALPHABET = upperCase(alphabet);

  const isUpperCase = (string: string) => /^[A-Z]*$/.test(string);

  const halfString = (string: string): [string, string] => {
    const halfway = string.length / 2;
    const firstHalf = string.slice(0, halfway);
    const secondHalf = string.slice(-halfway);
    return [firstHalf, secondHalf];
  };

  const matches = (a: string, b: string) => {
    let match = "";
    console.log(a, b);
    a.split("").map((c: string) => {
      if (b.includes(c)) {
        match += c;
      }
    });
    return match;
  };

  const countPoints = (string: string): number => {
    let points = 0;
    string.split("").map((c: string) => {
      if (isUpperCase(c)) {
        points += ALPHABET.indexOf(c) + alphabet.length + 1;
      } else {
        points += alphabet.indexOf(c) + 1;
      }
    });
    return points;
  };
  const results = input.map((str: string) =>
    countPoints(matches(...halfString(str)))
  );

  console.log(results);
  return results.reduce((a: number, b: number) => a + b, 0);
};

const testData = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];

// 10883 too high
console.log("p1", p1(puzzle.entries));

console.log("p1test", p1(testData));
