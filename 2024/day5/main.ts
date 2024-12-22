import { solve, solve_b } from "./solution";

const loadFile = async (path: string) => (await Bun.file(path).text()).trim();

async function main() {
  const input = await loadFile("input.txt");
  const test = await loadFile("test.txt");
  const test2 = await loadFile("test2.txt");

  const testMode = Bun.argv[2] === "test";
  const useP2 = Bun.argv[2] === "b" || Bun.argv[3] === "b";

  const testData = useP2 ? test2 : test;
  const data = testMode ? testData : input;
  const solution = useP2 ? solve_b : solve;

  console.log(solution(data));
}

main();
