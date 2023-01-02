type Signal = number | number[] | number[][];
type Signals = [Signal, Signal];
type DistressSignal = Signals[];

import { ensureArray, isNum, isUndef, parse, range } from "../functions.ts";

const input = await Deno.readTextFile("./input.txt");
const puzzle = parse(input, "\n\n");
const pt1Parse = (puzzle: string[]): DistressSignal =>
  puzzle.map((h) => h.split("\n").map((s) => JSON.parse(s))) as DistressSignal;

const pt2Parse = (input: string) => {
  return input.trim().replace(/\n\n/g, "\n").split("\n").map(
    (line) => JSON.parse(line),
  );
};
const pt1Input = pt1Parse(puzzle);

// const testInput = await Deno.readTextFile("./example.txt");
// const example = parse(testInput, "\n\n");
// const test: DistressSignal = specificParse(testInput);

function compare(a: Signal, b: Signal): number {
  if (isUndef(a)) return -1;
  else if (isUndef(b)) return 1;
  else if (isNum(a) && isNum(b)) return (a as number) - (b as number);

  a = ensureArray(a);
  b = ensureArray(b);
  return range(Math.max(a.length, b.length))
    .reduce(
      (ret, _, i) =>
        ret !== 0 ? ret : compare((a as number[])[i], (b as number[])[i]),
      0,
    );
}

// const tests = test.reduce(
//   (acc, el, index) => acc + (compare(el[0], el[1]) < 0 ? index + 1 : 0),
//   0,
// );
// console.log(tests);
// const testSols = test.map((s, i) => i + 1 + " " + compare(s[0], s[1]));
// console.log(testSols);

const res = pt1Input.reduce(
  (acc, el, index) => acc + (compare(el[0], el[1]) < 0 ? index + 1 : 0),
  0,
);
console.log("pt1", res);

const pt2Solver = (input: string) => {
  const decoders = [[[2]], [[6]]];
  const packets = pt2Parse(input).concat(decoders).sort(compare);
  // console.log(packets);
  return (packets.indexOf(decoders[0]) + 1) *
    (packets.indexOf(decoders[1]) + 1);
};
console.log("pt2", pt2Solver(input));
// console.log(pt2Solver(testInput))
