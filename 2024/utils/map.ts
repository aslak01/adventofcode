export const map =
  <T, U>(fn: (x: T) => U) =>
  (arr: T[]): U[] =>
    arr.map(fn);
