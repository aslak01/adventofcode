import { solve, solve_b } from "./solution";

const loadFile = async (path: string) =>
  (await Bun.file(path).text()).trim().split("\n");

async function main() {
  const input = await loadFile("input.txt");
  const test = await loadFile("test.txt");
  const test2 = await loadFile("test2.txt");

  const p2 = Bun.argv[3];
  const testMode = Bun.argv[2] === "test";
  console.log(Bun.argv[2], testMode);

  const testData = p2 ? test2 : test;
  const data = testMode ? testData : input;
  const solution = p2 ? solve_b : solve;

  console.log(solution(data));
}

main();
