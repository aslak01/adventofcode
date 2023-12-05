import { existsSync, mkdirSync } from "node:fs";
import { download_input } from "./download_input.ts";

export async function make_day(day: string) {
  const dayName = `d${day}`;
  const folderName = `./${dayName}`;

  try {
    if (!existsSync(folderName)) {
      mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }

  const input = await download_input(day);

  Bun.write(`${folderName}/input.ts`, input);

  ["a", "b"].map((pt) =>
    Bun.write(
      `${folderName}/test-${pt}.ts`,
      "export const test = [\n\n]",
    )
  );

  ["a", "b"].map((pt) =>
    Bun.write(
      `${folderName}/${pt}.ts`,
      `import { input } from "./input.ts"
import { test } from "./test-${pt}.ts";

const isTest = Bun.argv[0];

function main() {
  const data = isTest ? test : input;
  // TODO
  // const answer = 
  console.log(answer);
}
main();
`,
    )
  );
}
