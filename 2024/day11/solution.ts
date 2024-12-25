export function solve_a(input: string): number {
  return blink(input.split(" "), 25);
}

export function solve_b(input: string): number {
  return blink(input.split(" "), 75);
}

export function solve_c(input: string): number {
  return blink(input.split(" "), 7500);
}

function blink(puzzle: string[], n: number): number {
  const cache = new Map();

  const save = (result: number, cacheKey: string) => {
    cache.set(cacheKey, result);
    return result;
  };

  function applyRules(stone: string, n: number): number {
    if (n === 0) {
      return 1;
    }

    const cacheKey = `${stone},${n}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    if (stone == "0") {
      return save(applyRules("1", n - 1), cacheKey);
    }

    if (stone.length % 2 === 0) {
      const mid = Math.ceil(stone.length / 2);
      const a = Number(stone.slice(0, mid));
      const b = Number(stone.slice(mid));
      return save(
        applyRules(`${a}`, n - 1) + applyRules(`${b}`, n - 1),
        cacheKey,
      );
    }

    return save(applyRules(`${Number(stone) * 2024}`, n - 1), cacheKey);
  }

  return puzzle.reduce((sum, stone) => sum + applyRules(stone, n), 0);
}
