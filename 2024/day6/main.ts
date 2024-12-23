import { solve_a, solve_b } from "./solution";

const loadFile = async (path: string) => (await Bun.file(path).text()).trim();

async function main() {
  const input = await loadFile("input.txt");
  const test = await loadFile("test.txt");
  const test2 = await loadFile("test2.txt");

  const useP2 = Bun.argv[2] === "b" || Bun.argv[3] === "b";
  const testMode = Bun.argv[2] === "test";

  const testData = useP2 ? test2 : test;
  const data = testMode ? testData : input;
  const solve = useP2 ? solve_b : solve_a;

  console.log(solve(data.split("\n")));
}

main();
