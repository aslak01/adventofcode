const raw = await Bun.file("input.txt").text();
const input = raw.trim().split("\n");
const testdata = await Bun.file("test.txt").text();
const test = testdata.trim().split("\n");
const isTest = Bun.argv[2];

import { solve } from "./solution";

function main() {
  const data = isTest ? test : input;
  // TODO
  const answer = solve(data);
  console.log(answer);
}
main();
