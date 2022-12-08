import { parse } from "../parse.ts";
const rawPuzzle = await Deno.readTextFile("./input.txt");
const puzzle = parse(rawPuzzle).entries[0];

// const tests = [
//   "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
//   "bvwbjplbgvbhsrlpgdmjqwftvncz",
//   "nppdvjthqldpwncqszvftbrmjlhg",
//   "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
//   "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
// ];

type StringArrayOperation = (arr: string[]) => string[];

const uniq: StringArrayOperation = (arr: string[]): string[] =>
  Array.from(new Set(arr));

const nextN = (arr: string[], i: number, n: number) => {
  const chars = [];
  for (let g = 0; g < n; g++) {
    chars.push(arr[i + g]);
  }
  return chars;
};

const solve = (puzzle: string) => {
  const input = puzzle.split("");

  const findMark = (arr: string[], amt: number) => {
    let mark;
    for (const i of arr.keys()) {
      if (uniq(nextN(arr, i, amt)).length === amt) {
        mark = i + amt;
        break;
      }
    }
    return mark;
  };

  return [findMark(input, 4), findMark(input, 14)];
};

// const test = tests.map((t) => solve(t));
// console.log(test);
//
const solution = solve(puzzle);
console.log(solution);
