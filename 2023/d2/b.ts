import { input } from "./input.ts";
import { test } from "./test-a.ts";

const isTest = Bun.argv[2];

function main() {
  const data = isTest ? test : input;

  const answer = data.map(ballCounter).reduce((sum, curr) => sum + curr, 0);
  console.log(answer);
}
main();

function ballCounter(game: string) {
  const [gameId, games] = game.split(":");

  const gameNr = gameId.split(" ")[1];

  const gamesArr = games.split(";");

  const balls = gamesArr.map(ballSummer);
  const maxBalls = maxBaller(balls);
  const power = Object.values(maxBalls).reduce(
    (pow, curr) => (pow || 1) * curr,
    0,
  );
  return power;
}

function ballSummer(game: string) {
  const draws = game.split(",");

  const balls: Record<string, number> = draws.reduce(
    (acc: Record<string, number>, curr) => {
      const [amt, col] = curr.trim().split(" ");
      acc[col] = (acc[col] || 0) + Number(amt);
      return acc;
    },
    {},
  );
  console.log(balls);

  return balls;
}

function maxBaller(gameSums: Record<string, number>[]) {
  return gameSums.reduce((sums, game) => {
    return Object.entries(game).reduce((acc, [key, val]) => {
      acc[key] = Math.max(acc[key] || 0, val);
      return acc;
    }, sums);
  }, {});
}
