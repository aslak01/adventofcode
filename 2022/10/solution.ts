import { parse } from "../parse.ts";
const puzzle = parse(await Deno.readTextFile("./input.txt")).entries;

const operations = puzzle.map((line) => line.split(" "));

const pt1 = (ops: string[][]) => {
  const checkpoints = [20, 60, 100, 140, 180, 220];
  let signalSum = 0;
  let x = 1;
  let cycle = 1;
  for (const op of ops) {
    const prevX = x;
    if (op.length > 1) {
      x += parseInt(op[1]);
      cycle += 2;
    } else {
      cycle++;
    }
    if (checkpoints[0] === cycle) {
      signalSum += x * cycle;
      checkpoints.shift();
    }
    if (checkpoints[0] === cycle - 1) {
      signalSum += prevX * (cycle - 1);
      checkpoints.shift();
    }
  }
  return signalSum;
};

console.log("pt1", pt1(operations));

const pt2 = (ops: string[][]) => {
  const crt = Array(6).fill("");
  let cycle = 0;
  let x = 1;

  for (const op of ops) {
    let line = Math.floor(cycle / 40);
    let index = cycle % 40;
    crt[line] += Math.abs(index - x) <= 1 ? "X" : " ";
    cycle++;
    if (op.length > 1) {
      line = Math.floor(cycle / 40);
      index = cycle % 40;
      crt[line] += Math.abs(index - x) <= 1 ? "X" : " ";
      cycle++;
      x += parseInt(op[1]);
    }
  }
  return crt;
};

console.log("pt2", pt2(operations));
