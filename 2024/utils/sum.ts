export function sum(xs: number[]): number;
export function sum(a: number, b: number): number;
export function sum(aOrXs: number | number[], b?: number): number {
  if (Array.isArray(aOrXs)) {
    return aOrXs.reduce((acc, curr) => acc + curr, 0);
  }
  return aOrXs + (b || 0);
}
