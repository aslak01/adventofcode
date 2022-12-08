export const sumArr = (array: number[]): number =>
  array.reduce((a: number, b: number) => a + b, 0);

export const isUpperCase = (string: string) => /^[A-Z]*$/.test(string);

export const uniqArr = (arr: string[]): string[] => Array.from(new Set(arr));
