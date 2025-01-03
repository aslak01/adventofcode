import { sum } from "../utils/index.ts";

type Rules = [number, number][];
type Updates = number[][];

function parseInput(input: string): { rules: Rules; updates: Updates } {
  const [rawRules, rawUpdates] = input
    .split("\n\n")
    .map((raw) => raw.split("\n"));

  const rules = parseRules(rawRules);
  const updates = parseUpdates(rawUpdates);
  return {
    rules,
    updates,
  };
}
export function solve(input: string): number {
  const { rules, updates } = parseInput(input);
  const validUpdates = updates.filter(xBeforeY(rules));
  const midNumbers = validUpdates.map(findMiddle);

  return sum(midNumbers);
}

export function solve_b(input: string): number {
  const { rules, updates } = parseInput(input);
  const validator = xBeforeY(rules);
  const invalid = updates.filter((update) => !validator(update));
  const enforcer = createRuleEnforcer(rules);
  const resultUpdates = invalid.map(enforcer);
  const midNumbers = resultUpdates.map(findMiddle);
  return sum(midNumbers);
}

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

function findBrokenRules(
  nums: number[],
  rules: [number, number][],
): [number, number][] {
  return rules.filter(([x, y]) => {
    const xIndex = nums.indexOf(x);
    const yIndex = nums.indexOf(y);
    return xIndex !== -1 && yIndex !== -1 && xIndex > yIndex;
  });
}

function createRuleEnforcer(rules: [number, number][]) {
  const validateRules = xBeforeY(rules);

  function enforceRules(nums: number[]): number[] {
    if (validateRules(nums)) {
      return nums;
    }

    function fixViolations(array: number[]): number[] {
      const brokenRules = findBrokenRules(array, rules);

      if (brokenRules.length === 0) {
        return array;
      }

      const [x, y] = brokenRules[0];
      const xIndex = array.indexOf(x);
      const yIndex = array.indexOf(y);

      const newArray = [...array];
      [newArray[xIndex], newArray[yIndex]] = [
        newArray[yIndex],
        newArray[xIndex],
      ];

      return fixViolations(newArray);
    }

    return fixViolations([...nums]);
  }

  return enforceRules;
}
