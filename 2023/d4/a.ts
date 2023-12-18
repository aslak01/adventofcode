import { sum } from "../utils";
const raw = await Bun.file("./d4/input.txt").text();
const input = raw.split("\n");
import { test as rawTest } from "./test-a.ts";
const test = rawTest.trim().split("\n");

const isTest = Bun.argv[2];

function main() {
  const data = isTest ? test : input;
  const answer = data.map(winnerWinnerChickenDinner).reduce(sum);
  console.log(answer);
}
main();

function winnerWinnerChickenDinner(c: string) {
  const [_meta, card] = c.split(":");

  const [goals, contestants] = card.split("|").map((l) =>
    l.split(" ").filter((n) => n !== "")
  );

  const winners = contestants.filter((c) => goals.includes(c));
  const winAmt = winners.length;

  const score = winAmt > 0 ? Math.pow(2, winAmt - 1) : 0;
  return score;
}
