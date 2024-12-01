const raw = await Bun.file("input.txt").text();
const input = raw.trim().split("\n");
const testdata = await Bun.file("test.txt").text();
const test = testdata.trim().split("\n");
import { solve, solveb } from "./solution.ts";

const isTest = Bun.argv[2];

function main() {
  const data = isTest ? test : input;
  const answer = solveb(data);
  console.log(answer);
}
main();
