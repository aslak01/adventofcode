import { solver } from "./solution";

const loadFile = async (path: string) => (await Bun.file(path).text()).trim();

async function main() {
  const t = performance.now();
  const input = await loadFile("input.txt");
  const test = await loadFile("test.txt");
  const test2 = await loadFile("test2.txt");

  const a = Bun.argv[2] !== "b" && Bun.argv[3] !== "b";
  const testMode = Bun.argv[2] === "test";

  const testData = a ? test : test2;
  const data = testMode ? testData : input;
  const solve = a ? solver(data).a : solver(data).b;

  console.log("answer:");
  console.log(solve(data));
  console.log(`took ${Math.round(performance.now() - t)} ms`);
}

main();
