const raw = await Bun.file("./d5/input.txt").text();
const input = raw.split("\n\n");
import { fill } from "../utils.ts";
import { test as rawTest } from "./test-a.ts";
const test = rawTest.trim().split("\n\n");

const isTest = Bun.argv[2];

function main() {
  const data = isTest ? test : input;
  const deserialised = data.map(deserialise);
  const [seeds, ...steps] = deserialised;
  const ranges = seeds.map((s, i) => {
    if (i % 2 === 0) {
      return fill(seeds[i + 1], s);
    }
  });
  console.log(ranges);
  // const routed = range1.map((s) => routeSeed(s, steps));
  // const routed2 = range2.map((s) => routeSeed(s, steps));
  // const minRt1 = findMin(routed);
  // const minRt2 = findMin(routed2);

  // console.log("Found:", minRt1, minRt2);
}
main();

type Deserialised = number[] | number[][];
function deserialise(chunk: string): Deserialised {
  if (!chunk.includes("\n")) {
    const [_name, data] = chunk.split(":");
    const input = data.trim().split(" ").map(Number);
    return input;
  }
  const [_name, lines] = chunk.split(":").map((l) => l.replace(" map", ""));
  const data = lines.split("\n").map((l) => l.split(" ")).filter((
    a,
  ) => a.every((i) => i !== ""));
  return data.map((l) => l.map(Number));
}

function routeSeed(seed: number, steps: number[][]) {
  if (steps.length === 0) {
    return seed;
  }
  const [step, ...restSteps] = steps;

  const ranges = step.map((s) => ({
    min: s[1],
    max: s[1] + s[2] - 1,
    out: s[0] - s[1],
  }));

  const rangeObject = ranges.find((range) =>
    seed >= range.min && seed <= range.max
  );
  return routeSeed(seed + (rangeObject?.out || 0), restSteps);
}

function findMin(array: number[]) {
  if (array.length === 0) {
    return undefined;
  }
  let minValue = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    }
  }

  return minValue;
}
