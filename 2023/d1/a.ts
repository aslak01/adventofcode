import { input } from "./input.ts";
import { test } from "./test.ts";

// sum first and last n of each str

function concatFirstNLastNr(str: string) {
  const arr = str.split("");
  const first = arr.find((c) => !isNaN(Number(c)));
  const last = arr.reverse().find((c) => !isNaN(Number(c)));
  return Number(`${first}${last}`);
}

const isTest = Deno.args[0];

function main() {
  const data = isTest ? test : input;
  const answer = data.map(concatFirstNLastNr).reduce(
    (sum, curr) => sum + curr,
    0,
  );

  console.log(answer);
}

main();
