type Delta = { min: number; max: number };
export function solve(input: string[], delta = { min: 1, max: 3 }): number {
  const lines = input.filter((line) => checkLineWithDampening(line, delta));
  return lines.length;
}

function checkLine(report: string, delta: Delta) {
  const numbers = report.split(" ").map(Number).filter(Number);
  return isSafe(numbers, delta);
}

// B
function checkLineWithDampening(report: string, delta: Delta): boolean {
  const numbers = report.split(" ").map(Number).filter(Number);
  const dampenedReports = subsetsWithOneRemoved(numbers);
  return dampenedReports.filter((x) => isSafe(x, delta)).length > 0;
}

function subsetsWithOneRemoved<T>(arr: T[]) {
  return arr.map((_, skipIndex) =>
    arr.filter((_, index) => index !== skipIndex),
  );
}

function isDecreasingByDeltaRange(
  arr: number[],
  delta: { min: number; max: number },
) {
  return arr.every((n, i) => {
    const next = arr.at(i + 1);
    if (!next) return true;
    const diff = n - next;
    return diff >= delta.min && diff <= delta.max;
  });
}

function isIncreasingByDeltaRange(
  arr: number[],
  delta: { min: number; max: number },
) {
  return arr.every((n, i) => {
    const next = arr.at(i + 1);
    if (!next) return true;
    const diff = next - n;
    return diff >= delta.min && diff <= delta.max;
  });
}

function isSafe(report: number[], delta: Delta): boolean {
  return (
    isIncreasingByDeltaRange(report, delta) ||
    isDecreasingByDeltaRange(report, delta)
  );
}

// function compareArrsOfNums(a: number[], b: number[]) {
//   return a.every((num, index) => num === b[index]);
// }
//
// function sortNumsDescending(arr: number[]) {
//   return arr.toSorted((a, b) => b - a);
// }
