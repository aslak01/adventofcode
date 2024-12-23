import { pipe } from "../utils/pipe.ts";

export function solve_a(input: string[]): number {
  const playerPos = findPlayerPos(input);
  const path = movePlayer(input, playerPos);
  console.log(visualizePath(input, path).join("\n"));
  const uniquePositions = new Set(path.map((p) => JSON.stringify(p)));
  return uniquePositions.size;
}

function findPlayerPos(strings: string[]): [number, number] {
  const startY = strings.findIndex((line) => line.includes("^"));
  const startX = strings[startY].indexOf("^");
  return [startX, startY];
}

type Direction = "up" | "right" | "down" | "left";
type Position = [number, number];

function movePlayer(
  grid: string[],
  position: Position,
  direction: Direction = "up",
): Position[] {
  const [x, y] = position;
  const path: Position[] = [position];

  const getNextPos = (direction: Direction): Position => {
    const moves: Record<Direction, Position> = {
      up: [0, -1],
      right: [1, 0],
      down: [0, 1],
      left: [-1, 0],
    };
    const [dx, dy] = moves[direction];
    return [x + dx, y + dy];
  };

  const isValidPosition = ([nextX, nextY]: Position): boolean => {
    return (
      nextX >= 0 && nextX < grid[0].length && nextY >= 0 && nextY < grid.length
    );
  };

  const nextPos = getNextPos(direction);

  // if next position would be out of bounds, we're done
  if (!isValidPosition(nextPos)) {
    return path;
  }

  const [nextX, nextY] = nextPos;

  // if we're about to hit an obstacle, turn 90 degrees
  if (grid[nextY][nextX] === "#") {
    const nextDirection: Record<Direction, Direction> = {
      up: "right",
      right: "down",
      down: "left",
      left: "up",
    };

    return [...path, ...movePlayer(grid, position, nextDirection[direction])];
  }

  return [...path, ...movePlayer(grid, nextPos, direction)];
}

function visualizePath(grid: string[], path: Position[], char = "*"): string[] {
  const result = grid.map((line) => line.split(""));
  path.forEach(([x, y], i) => {
    if (result[y][x] !== "#" && result[y][x] !== "^") {
      result[y][x] = char;
    }
  });
  return result.map((line) => line.join(""));
}

export function solve_b(input: string[]): number {
  const playerPos = findPlayerPos(input);
  const infiniteLoops = findLoopCreatingObstacles(input, playerPos);

  console.log(visualizePath(input, infiniteLoops, "O").join("\n"));
  return infiniteLoops.length;
}

type VisitState = `${number},${number}-${Direction}`;

function detectLoop(
  grid: string[],
  position: Position,
  direction: Direction = "up",
  visited: Set<VisitState> = new Set(),
): boolean {
  const [x, y] = position;
  const currentState: VisitState = `${x},${y}-${direction}`;

  // if we've been here in this direction before, it's a loop
  if (visited.has(currentState)) {
    return true;
  }

  visited.add(currentState);

  const moves: Record<Direction, Position> = {
    up: [0, -1],
    right: [1, 0],
    down: [0, 1],
    left: [-1, 0],
  };
  const [dx, dy] = moves[direction];
  const nextPos: Position = [x + dx, y + dy];
  const [nextX, nextY] = nextPos;

  if (
    nextX < 0 ||
    nextX >= grid[0].length ||
    nextY < 0 ||
    nextY >= grid.length
  ) {
    return false;
  }

  if (grid[nextY][nextX] === "#") {
    const nextDirection: Record<Direction, Direction> = {
      up: "right",
      right: "down",
      down: "left",
      left: "up",
    };
    return detectLoop(grid, position, nextDirection[direction], visited);
  }

  return detectLoop(grid, nextPos, direction, visited);
}

function findLoopCreatingObstacles(
  originalGrid: string[],
  [startX, startY]: Position,
): Position[] {
  function checkPosition(
    x: number,
    y: number,
    accPositions: Position[] = [],
  ): Position[] {
    // base case: we've checked all positions
    if (y >= originalGrid.length) {
      return accPositions;
    }
    // base case: move to next row
    if (x >= originalGrid[0].length) {
      return checkPosition(0, y + 1, accPositions);
    }

    if (originalGrid[y][x] !== ".") {
      return checkPosition(x + 1, y, accPositions);
    }

    const testGrid = originalGrid.map((row) => row.split(""));
    testGrid[y][x] = "#";
    const gridWithObstacle = testGrid.map((row) => row.join(""));

    // if this creates a loop, add it to our accumulator
    const newPositions = [...accPositions];
    if (detectLoop(gridWithObstacle, [startX, startY])) {
      newPositions.push([x, y]);
    }

    return checkPosition(x + 1, y, newPositions);
  }

  return checkPosition(0, 0);
}
