import { sum } from "../utils/index.ts";
export function solve(input: string): number {
  const [rawRules, rawUpdates] = input
    .split("\n\n")
    .map((raw) => raw.split("\n"));

  const rules = parseRules(rawRules);
  const updates = parseUpdates(rawUpdates);
  const validUpdates = updates.filter(xBeforeY(rules));
  const midNumbers = validUpdates.map(findMiddle);

  return sum(midNumbers);
}

export function solve_b(input: unknown): number {
  return 42;
}

type Rules = [number, number][];
type Updates = number[][];

function parseRules(rules: string[]): Rules {
  return rules.map((rule) => rule.split("|").map(Number)) as [number, number][];
}
function parseUpdates(updates: string[]): Updates {
  return updates.map((upd) => upd.split(",").map(Number));
}

function updateFollowsRules(rules: Rules, updates: Updates): boolean {
  return true;
}

function xBeforeY(rules: [number, number][]) {
  return function (nums: number[]): boolean {
    return rules.every(([x, y]) => {
      const xIndex = nums.indexOf(x);
      const yIndex = nums.indexOf(y);

      // if neither mentioned in rules we're fine
      if (xIndex === -1 && yIndex === -1) return true;
      // if only one of the two are mentioned in the rule, we're fine
      if (xIndex === -1 || yIndex === -1) return true;
      // if x is before y, rule is followed
      return xIndex < yIndex;
    });
  };
}

function findMiddle<T>(arr: T[]): T {
  if (arr.length % 2 === 0) {
    throw new Error("Array must have odd number of entries");
  }
  return arr[Math.floor(arr.length / 2)];
}
