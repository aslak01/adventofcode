export const sum = (acc: number, curr: number) => acc + curr;
export const fill = (len: number, min: number = 0) =>
  Array.from({ length: len }, (_, index) => min + index);
// export const fill = <T>(len: number, fn: (i: number) => T) =>
//   Array.from({ length: len }, (_, i) => fn(i));
