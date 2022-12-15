import { parse } from "../parse.ts";
const puzzle = parse(await Deno.readTextFile("./input.txt")).entries;

interface Move {
  move: string;
  count: number;
}
interface Knot {
  x: number;
  y: number;
}

const moves: Move[] = puzzle.map((line) => {
  let [move, count]: Array<string | number> = line.split(" ");
  count = parseInt(count);
  return { move, count };
});

const pt1 = (moves: Move[]) => {
  const head = { x: 0, y: 0, prevX: 0, prevY: 0 };
  const tail = { x: 0, y: 0 };
  const visited = new Set();

  const isTouching = () => {
    const xDiff = Math.abs(head.x - tail.x);
    const yDiff = Math.abs(head.y - tail.y);
    return xDiff <= 1 && yDiff <= 1;
  };

  for (const mv of moves) {
    const { move, count } = mv;
    for (let i = 0; i < count; i++) {
      head.prevX = head.x;
      head.prevY = head.y;
      if (move === "U") head.y++;
      if (move === "D") head.y--;
      if (move === "R") head.x++;
      if (move === "L") head.x--;

      if (isTouching() === false) {
        tail.x = head.prevX;
        tail.y = head.prevY;
      }
      visited.add(`${tail.x},${tail.y}`);
    }
  }
  return visited.size;
};

console.log("pt1", pt1(moves));

const pt2 = (moves: Move[]) => {
  const rope = Array(10)
    .fill(0)
    .map(() => ({ x: 0, y: 0 }));
  const visited = new Set();

  const isTouching = (knot1: Knot, knot2: Knot) => {
    const xDiff = Math.abs(knot1.x - knot2.x);
    const yDiff = Math.abs(knot1.y - knot2.y);
    return xDiff <= 1 && yDiff <= 1;
  };

  const moveKnot = (knot1: Knot, knot2: Knot) => {
    const newPos = { ...knot2 };
    const xDiff = knot2.x - knot1.x;
    const yDiff = knot2.y - knot1.y;

    if (xDiff < 0) newPos.x++;
    if (xDiff > 0) newPos.x--;
    if (yDiff < 0) newPos.y++;
    if (yDiff > 0) newPos.y--;

    return newPos;
  };

  for (const mv of moves) {
    const { move, count } = mv;
    for (let i = 0; i < count; i++) {
      if (move === "U") rope[0].y++;
      if (move === "D") rope[0].y--;
      if (move === "R") rope[0].x++;
      if (move === "L") rope[0].x--;
      for (let k = 1; k < rope.length; k++) {
        if (isTouching(rope[k - 1], rope[k]) === false) {
          rope[k] = moveKnot(rope[k - 1], rope[k]);
        }
      }
      visited.add(`${rope[9].x},${rope[9].y}`);
    }
  }
  return visited.size;
};
console.log("pt2", pt2(moves));
