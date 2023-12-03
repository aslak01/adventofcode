import { input } from "./input.ts";
import { test } from "./test-b.ts";

const writtenDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function sumFirstNLastNr(str: string) {
  const arr = str.split("");
  const rra = arr.toReversed();
  const rts = rra.join("");

  function reverseStr(str: string) {
    return str.split("").toReversed().join("");
  }

  const firstDigitIndex = arr.findIndex((c) => !isNaN(Number(c)));
  const lastDigitIndex = rra.findIndex((c) => !isNaN(Number(c)));

  function findSubstringIndex(inputString: string, substrings: string[]) {
    const result = substrings
      .map((substring, n) => {
        const i = inputString.indexOf(substring);
        return { i, n };
      })
      .filter(({ i }) => i > -1)
      .reduce(
        (min, current) => (current.i < min.i ? current : min),
        { i: Infinity, n: -1 },
      );

    return result;
  }

  const firstWrittenIndex = findSubstringIndex(str, writtenDigits);
  const lastWrittenIndex = findSubstringIndex(
    rts,
    writtenDigits.map(reverseStr),
  );

  function invertMissing(n: number) {
    return n === -1 ? Infinity : n;
  }

  const first =
    invertMissing(firstWrittenIndex.i) > invertMissing(firstDigitIndex)
      ? str[firstDigitIndex]
      : firstWrittenIndex.n + 1;

  const last = invertMissing(lastWrittenIndex.i) > invertMissing(lastDigitIndex)
    ? rts[lastDigitIndex]
    : lastWrittenIndex.n + 1;

  return Number(`${first}${last}`);
}

const isTest = Deno.args[0];

function main() {
  const data = isTest ? test : input;
  const answer = data.map(sumFirstNLastNr).reduce(
    (sum, curr) => sum + curr,
    0,
  );

  console.log(answer);
}

main();
