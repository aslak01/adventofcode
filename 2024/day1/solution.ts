export function solve(input: string[]): number {
  const [lista, listb] = separateLists(input);
  const deltas = returnDeltas(lista.toSorted(), listb.toSorted());

  return deltas.reduce((prev, curr) => prev + curr, 0);
}

function separateLists(input: string[]): number[][] {
  const lists = input.map((str) => str.split("   "));
  const a = lists.map((l) => Number(l[0]));
  const b = lists.map((l) => Number(l[1]));

  return [a, b];
}

function returnDeltas(a: number[], b: number[]) {
  return a.map((n, i) => {
    return Math.abs(n - b[i]);
  });
}

export function solveb(input: string[]): number {
  const [lista, listb] = separateLists(input);
  const similarityScores = getSimilarityScores(
    lista.toSorted(),
    listb.toSorted(),
  );

  return similarityScores.reduce((prev, curr) => prev + curr, 0);
}

function getSimilarityScores(a: number[], b: number[]): number[] {
  const frequencies = a.map((n) => b.filter((x) => x === n).length);
  return a.map((n, i) => n * frequencies[i]);
}
