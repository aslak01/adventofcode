const raw = await Bun.file("input.txt").text();
const input = raw.split("\\n");
const testdata = await Bun.file("test.txt").text();
const test = testdata.trim().split("\\n");
const isTest = Bun.argv[2];

import { solution } from "./solution";

function main() {
  const data = isTest ? test : input;
  // TODO
  const answer = "42";
  console.log(answer);
}
main();
