export function solve_b(input: string): number {
  const dos = removeDont(input);
  return solve(dos);
}

export function solve(input: string): number {
  const multiply_operations = input.match(/mul\((?:\d{1,3})(?:,\d{1,3})*\)/g);

  if (!multiply_operations) return 42;

  const factors = multiply_operations.map(String).map(get_factors);

  if (!factors) return 42;

  const multiplied = factors
    .filter((el) => typeof el !== "undefined")
    .map(multiply);

  return multiplied.reduce((acc, val) => acc + val, 0);
}

function get_factors(multiply_operation: string): [number, number] | undefined {
  const factors = multiply_operation
    .replaceAll("mul", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .split(",");

  if (!factors || factors.length !== 2) return;

  return [Number(factors[0]), Number(factors[1])];
}

const multiply = ([a, b]: [number, number]): number => a * b;

const removeDont = (str: string) => {
  if (!str.includes("don't()")) return str;

  const [before, ...rest] = str.split("don't()");

  if (!rest.join("").includes("do()")) return before;

  return removeDont(
    before +
      rest
        .map((part) => {
          const [_, ...keep] = part.split("do()");
          return keep.join("do()");
        })
        .join(""),
  );
};
