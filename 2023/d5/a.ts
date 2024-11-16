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
  // console.log("seeds", seeds);
  // console.log("steps", steps);
  const routed = seeds.map((s) => routeSeed(s, steps));
  console.log(routed);
  console.log(Math.min(...routed));
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

  const inp = step[1];
  const out = step[0];
  const range = step[2];

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
