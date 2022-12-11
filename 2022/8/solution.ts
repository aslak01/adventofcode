import { parse } from "../parse.ts";
const puzzle = parse(await Deno.readTextFile("./input.txt")).entries;
// const example = parse(await Deno.readTextFile("./example.txt")).entries;
type PuzzleParseFunction = (i: number, j: number) => number | void;

const solve = (input: number[][]) => {
  const sliceLTRB = (i: number, j: number, data: number[][]) => {
    return [
      data[i].slice(0, j).reverse(),
      data
        .slice(0, i)
        .map((e) => e[j])
        .reverse(),
      data[i].slice(j + 1, data[i].length),
      data.slice(i + 1, data.length).map((e) => e[j]),
    ];
  };
  const isVisible = (i: number, j: number, data: number[][]): number => {
    const visibility = sliceLTRB(i, j, data)
      .map((slice) => Math.max(...slice))
      .some((max) => max < data[i][j]);
    return visibility ? 1 : 0;
  };
  const traverse = (data: number[][], fn: PuzzleParseFunction) => {
    for (let i = 1; i < data.length - 1; ++i) {
      for (let j = 1; j < data[i].length - 1; ++j) {
        fn(i, j);
      }
    }
  };
  const getVisibleCount = (data: number[][]): number => {
    let visible = data.length * 2 + (data[0].length - 2) * 2;
    traverse(data, (i: number, j: number) => {
      visible += isVisible(i, j, data);
    });
    return visible;
  };
  const pt1 = getVisibleCount(input);

  const scenicScore = (i: number, j: number, data: number[][]) => {
    const score = sliceLTRB(i, j, data)
      .map((slice) => [slice, slice.findIndex((tree) => tree >= data[i][j])])
      .map(([slice, findex]) => (findex === -1 ? slice.length : findex + 1))
      .reduce((a, b) => a * b);
    return score;
  };
  const getBestScenicScore = (data: number[][]) => {
    let best = 0;
    traverse(data, (i: number, j: number) => {
      best = Math.max(scenicScore(i, j, data), best);
    });
    return best;
  };

  const pt2 = getBestScenicScore(input);

  return {
    pt1,
    pt2,
  };
};

const puzzlearrs = puzzle.map((i) => i.split("").map((n) => parseInt(n)));
const solved = solve(puzzlearrs);
console.log(solved);
