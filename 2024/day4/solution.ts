export function solve(input: string[]): number {
  const search = matrixWordSearch(input.map((l) => l.split("")));
  const targetWord = "XMAS";
  return search.searchWord(targetWord);
}

export function solve_b(input: unknown): number {
  return 42;
}

type Matrix = string[][];
type Position = readonly [number, number];
type Direction = readonly [number, number];

const matrixWordSearch = (matrix: Matrix) => {
  const directions: Direction[] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const isValidPos = ([row, col]: Position): boolean =>
    row >= 0 && col >= 0 && row < matrix.length && col < matrix[0].length;

  const searchInDirection = (
    pos: Position,
    word: string,
    dir: Direction,
  ): boolean =>
    !word.length
      ? true
      : !isValidPos(pos)
        ? false
        : matrix[pos[0]][pos[1]] !== word[0]
          ? false
          : searchInDirection(
              [pos[0] + dir[0], pos[1] + dir[1]],
              word.slice(1),
              dir,
            );

  const searchFromPosition = (pos: Position, word: string): number =>
    directions.reduce(
      (count, dir) => count + (searchInDirection(pos, word, dir) ? 1 : 0),
      0,
    );

  const searchAllPositions = (positions: Position[], word: string): number =>
    positions.length === 0
      ? 0
      : searchFromPosition(positions[0], word) +
        searchAllPositions(positions.slice(1), word);

  const getAllPositions = (): Position[] =>
    matrix.flatMap((row, i) => row.map((_, j): Position => [i, j]));

  const searchWord = (word: string): number =>
    searchAllPositions(getAllPositions(), word);

  return { searchWord };
};
