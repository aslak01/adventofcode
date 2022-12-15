import { parse } from "../parse.ts";
const puzzle = parse(await Deno.readTextFile("./input.txt")).entries;

// dijkstraings
let start = { x: 0, y: 0 };
let end = { x: 0, y: 0 };
const heightMap = puzzle.map((line, indexY) =>
  line.split("").map((char, indexX) => {
    if (char === "S") {
      start = { x: indexX, y: indexY };
      return Infinity;
    }
    if (char === "E") {
      end = { x: indexX, y: indexY };
      // end always at "z"
      // lowercase alphabet utf-12 always starts at 97
      return 122 - 97;
    } else return char.charCodeAt(0) - 97;
  })
);

const visited = heightMap.map((line) => line.map(() => false));
const shortestPaths = heightMap.map((line) => line.map(() => Infinity));
shortestPaths[end.y][end.x] = 0;

const queue = [end];

while (queue.length > 0) {
  const pos = queue.shift();
  if (
    typeof pos === "undefined" ||
    typeof pos.x === "undefined" ||
    typeof pos.y === "undefined"
  ) {
    break;
  }
  visited[pos.y][pos.x] = true;

  let neighbours = [
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
  ];

  neighbours = neighbours.filter((neighbour) => {
    return heightMap[neighbour.y]?.[neighbour.x] !== undefined;
  });

  neighbours.forEach((neighbour) => {
    if (
      typeof pos === "undefined" ||
      typeof pos.x === "undefined" ||
      typeof pos.y === "undefined"
    ) {
      return;
    }
    const currHeight = heightMap[pos.y][pos.x];
    const nextHeight = heightMap[neighbour.y][neighbour.x];
    if (currHeight >= nextHeight - 1) {
      const shortestDist = shortestPaths[neighbour.y][neighbour.x] + 1;
      const currShortestDist = shortestPaths[pos.y][pos.x];
      shortestPaths[pos.y][pos.x] = Math.min(currShortestDist, shortestDist);
    }

    if (!visited[neighbour.y][neighbour.x] && currHeight <= nextHeight + 1) {
      queue.push(neighbour);
      visited[neighbour.y][neighbour.x] = true;
    }
  });
}
console.log("pt1", shortestPaths[start.y][start.x]);

let min = Infinity;

heightMap.forEach((line, y) => {
  line.forEach((height, x) => {
    if (height === 0) min = Math.min(min, shortestPaths[y][x]);
  });
});

console.log("pt2", min);
