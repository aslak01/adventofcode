export function solve(input: string): number {
  console.log(input);
  const [rawRules, rawUpdates] = input
    .split("\n\n")
    .map((raw) => raw.split("\n"));

  console.log(rawRules, rawUpdates);
  const rules = parseRules(rawRules);
  const updates = parseUpdates(rawUpdates);
  console.log(rules, updates);

  return 43;
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

function xBeforeY(nums: number[], rules: [number, number]): boolean {
  const [x, y] = rules;
  const xIndex = nums.indexOf(x);
  const yIndex = nums.indexOf(y);
  if (xIndex === -1 && yIndex === -1) return true;

  if (xIndex) return true;
}
