import { input } from "./input.ts";
import { test } from "./test-a.ts";

const isTest = Deno.args[0];

const total = {
  red: 12,
  green: 13,
  blue: 14,
};

function main() {
  const data = isTest ? test : input;

  const answer = data.map(validGameIds).reduce((sum, curr) => sum + curr, 0);
  console.log(answer);
}
main();

function validGameIds(game: string) {
  const [gameId, games] = game.split(":");

  const gameNr = gameId.split(" ")[1];

  const gamesArr = games.split(";");

  const gamesValid = gamesArr.map(gameValidator);

  return gamesValid.every((g) => g === true) ? Number(gameNr) : 0;
}

function gameValidator(game: string): boolean {
  const draws = game.split(",");

  const balls: Record<string, number> = draws.reduce((acc, curr) => {
    const [amt, col] = curr.trim().split(" ");
    acc[col] = (acc[col] || 0) + Number(amt);
    return acc;
  }, {});

  const valid = Object.entries(balls).every(([col, amt]) => amt <= total[col]);

  return valid;
}
