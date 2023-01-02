export const parse = (input: string, sep = "\n"): string[] =>
  input.trim().split(sep);

export const sumArr = (array: number[]): number =>
  array.reduce((a: number, b: number) => a + b, 0);

export const isUpperCase = (string: string) => /^[A-Z]*$/.test(string);

export const uniqArr = (arr: string[]): string[] => Array.from(new Set(arr));

export const isArr = (x: unknown): boolean => Array.isArray(x);
export const isNum = (x: unknown): boolean => typeof x === "number";
export const isUndef = (x: unknown): boolean => typeof x === "undefined";
export const emptyArr = (x: unknown[]): boolean => isArr(x) && x.length === 0;
export const ensureArray = (x: number | number[] | number[][]): number[] | number[][] =>
  isArr(x) ? (x as number[] | number[][]) : [x] as number[] | number[][];
export const xOr = (a: boolean, b: boolean): boolean => (a || b) && !(a && b);

// const ensureArray = (
//   item: number | number[] | number[][],
// ): number[] | number[][] => Array.isArray(item) ? item : [item];

export const range = (length: number): number[] => [...Array(length).keys()];
