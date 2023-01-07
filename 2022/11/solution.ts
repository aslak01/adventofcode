import { range } from "../functions.ts";
import { multiply } from "https://x.nest.land/rambda@7.5.0/mod.ts";
const input = await Deno.readTextFile("./input.txt");

interface Monkey {
  items: number[];
  op: (v: number) => number;
  test: number[];
  inspections: number;
}

function parseInput(input: string): Monkey[] {
  return input.split("\n\n").map(
    // return an object with properties, representing the monkey.
    (p) => {
      // remove newlines before "If" statements to make it easier to parse the test and throw
      const lines = p.replace(/\n.+If/g, "").split("\n");
      const toNums = (line) => line.match(/\d+/g)?.map(Number);
      return {
        items: toNums(lines[1]),
        op: (old) => eval(eval(lines[2].split("=")[1])),
        test: toNums(lines[3]),
        inspections: 0,
      };
    },
  );
}

function simulate(
  monkeys: Monkey[],
  rounds: number,
  worryDivisor: number,
): Monkey[] {
  // to prevent numbers from getting too big for js to handle, find a common denominator to divide stress numbers by, which won't mess
  // up the monkey.test functions
  const stressManagementDivisor = monkeys.reduce(
    (total, m) => total * m.test[0],
    1,
  );
  range(rounds).forEach(() => {
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        item = Math.floor(monkey.op(item) / worryDivisor) %
          stressManagementDivisor;
        monkeys[item % monkey.test[0] === 0 ? monkey.test[1] : monkey.test[2]]
          .items.push(item);
        monkey.inspections++;
      });
      monkey.items = [];
    });
  });

  return monkeys;
}

function findBusinessLevel(
  input: string,
  rounds: number,
  worryDivisor: number,
): number {
  return multiply.apply(
    null,
    simulate(parseInput(input), rounds, worryDivisor)
      .map((m) => m.inspections)
      .sort((a, b) => b - a)
      .slice(0, 2),
  );
}

const pt1 = (input: string) => findBusinessLevel(input, 20, 3);
console.log("pt1", pt1(input.trim()));
const pt2 = (input: string) => findBusinessLevel(input, 10000, 1);
console.log("pt2", pt2(input.trim()));
