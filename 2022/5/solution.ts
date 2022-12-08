import { parse } from "../parse.ts";
const rawPuzzle = await Deno.readTextFile("./input.txt");
const puzzle = parse(rawPuzzle).entries;

const splitDataFromInstructions = (puzzle: string[]) => {
  const separatorIndex = puzzle.indexOf("");
  return {
    data: puzzle.slice(0, separatorIndex),
    instructions: puzzle.slice(separatorIndex + 1),
  };
};
const splitPuzzle = splitDataFromInstructions(puzzle);

type Stacks = string[][];

const deserializeData = (data: string[]): Stacks => {
  const removeBrackets = (string: string) =>
    string.replaceAll("[", " ").replaceAll("]", " ");
  const splitByFours = (string: string) => {
    let quadruplet = "";
    const match = string.match(/.{1,4}/g);
    if (match !== null) quadruplet = match;
    return quadruplet;
  };
  const lines = data
    .map((l) => splitByFours(removeBrackets(l)))
    .map((l) => l.map((e) => e.trim()))
    .filter((l) => isNaN(Number(l[0])) === true)
    .reverse();

  const transformToStacks = (lines: string[]): Stacks => {
    const stacks: string[][] = [];
    lines.map((l) =>
      l.map((b, i: number) => {
        if (b !== "") {
          if (!stacks[i]) stacks[i] = [];
          stacks[i].push(b);
        }
      })
    );
    return stacks;
  };
  const stacks = transformToStacks(lines);
  return stacks;
};
const deserializedData = deserializeData(splitPuzzle.data);

const executeInstructions = (stacks: Stacks, instructions: string[]) => {
  const deserializeInstructions = (instructions: string[]) => {
    const moves = instructions
      .map((l) => l.split(" "))
      .map((l) => l.map((w) => w.replace(/\D/g, "")).filter(Boolean))
      .map((l) => l.map((n) => Number(n)));
    return moves;
  };
  // Moves: Amount, from, to
  const moves = deserializeInstructions(instructions);
  const executeMoves = (stks: Stacks, moves: number[][]) => {
    const movingStacks = JSON.parse(JSON.stringify(stks)),
      movingStacks9001 = JSON.parse(JSON.stringify(stks));
    const moveCrate = (from: number, to: number) => {
      const crate = movingStacks[from].pop();
      if (typeof crate === "undefined") return;
      movingStacks[to].push(crate);
    };
    const moveCrates9001 = (from: number, to: number, amount: number) => {
      const crates = movingStacks9001[from].splice(-amount, amount);
      movingStacks9001[to] = movingStacks9001[to].concat(crates);
    };
    moves.forEach((l) => {
      const amount = l[0],
        from = l[1] - 1,
        to = l[2] - 1;
      moveCrates9001(from, to, amount);
      for (let i = 0; i < amount; i++) {
        moveCrate(from, to);
      }
    });
    return { 1: movingStacks, 2: movingStacks9001 };
  };
  const result = executeMoves(stacks, moves);
  return result;
};

const result = executeInstructions(deserializedData, splitPuzzle.instructions);

const serializeSolution = (result: { [key: string]: string[][] }) => {
  let letters = [];
  Object.values(result).map((l, i) => {
    letters.push(" " + (i + 1) + ": ");
    l.map((c) => {
      const letter = c.pop();
      letters.push(letter);
    });
  });
  return letters.join("");
};
const solution = serializeSolution(result);

console.log(solution);
