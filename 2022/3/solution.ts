import { parse } from "../parse.ts";

import { upperCase } from "https://deno.land/x/case/mod.ts";
const rawPuzzle = await Deno.readTextFile("./input.txt");

const puzzle = parse(rawPuzzle);

const sumArr = (array: number[]): number =>
  array.reduce((a: number, b: number) => a + b, 0);

const testData = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const ALPHABET = upperCase(alphabet);

const isUpperCase = (string: string) => /^[A-Z]*$/.test(string);

const unqStrFromStr = (str: string[]): string =>
  [...new Set(str.split(""))].toString();

const unqStrFromArr = (arr: string[]): string => [...new Set(arr)].toString();

const calcValue = (string): number => {
  let points = 0;
  if (isUpperCase(string)) {
    points += ALPHABET.indexOf(string) + alphabet.length + 1;
  } else {
    points += alphabet.indexOf(string) + 1;
  }
  return points;
};

const p1 = (input: string[]) => {
  const halfString = (string: string): [string, string] => {
    const halfway = string.length / 2;
    const firstHalf = string.slice(0, halfway);
    const secondHalf = string.slice(-halfway);
    return [firstHalf, secondHalf];
  };

  const matches = (a: string, b: string) => {
    let match = "";
    a.split("").map((c: string) => {
      if (b.includes(c)) {
        match += c;
      }
    });
    if (match.length > 1) {
      match = unqStrFromStr(match);
    }
    return match;
  };

  const countPoints = (string: string): number => {
    if (string.length < 1) return 0;
    const values = string.split("").map((c: string) => calcValue(c));
    return sumArr(values);
  };

  const results = input.map((str: string) =>
    countPoints(matches(...halfString(str)))
  );

  return sumArr(results);
};

console.log("p1test", p1(testData));
console.log("p1", p1(puzzle.entries));

const p2 = (input: string[]): number => {
  const perGroup = 3;
  const groups = input.reduce((resultArray, item, index) => {
    const groupIndex = Math.floor(index / perGroup);
    if (!resultArray[groupIndex]) {
      resultArray[groupIndex] = [];
    }
    resultArray[groupIndex].push(item);
    return resultArray;
  }, []);

  const findCommon = (group: string[]): string => {
    const strToArr = (str: string): string[] => str.split("");
    const groupArrs = group.map(strToArr);
    const join = groupArrs.reduce((join, current) =>
      join.filter((el) => current.includes(el))
    );
    return unqStrFromArr(join);
  };

  const results = groups.map((g) => calcValue(findCommon(g)));
  return sumArr(results);
};

console.log("p2test", p2(testData));

console.log("p2", p2(puzzle.entries));
