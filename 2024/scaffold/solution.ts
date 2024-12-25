export function solver(input: string): {
  a: (input: string) => number;
  b: (input: string) => number;
} {
  function a(input: string): number {
    console.log(input);
    return 42;
  }
  function b(input: string): number {
    console.log(input);
    return 69;
  }
  return {
    a,
    b,
  };
}
