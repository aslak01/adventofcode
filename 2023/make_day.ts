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

  Bun.write(`${folderName}/input.txt`, input);

  ["a", "b"].map((pt) =>
    Bun.write(
      `${folderName}/test-${pt}.ts`,
      "export const test = `\n\n`",
    )
  );

  ["a", "b"].map((pt) =>
    Bun.write(
      `${folderName}/${pt}.ts`,
      `const raw = await Bun.file("${folderName}/input.txt").text();
const input = raw.split("\\n")
import { test as rawTest } from "./test-${pt}.ts";
const test = rawTest.trim().split("\\n")


const isTest = Bun.argv[2];

function main() {
  const data = isTest ? test : input;
  // TODO
  const answer = "42"
  console.log(answer);
}
main();
`,
    )
  );
}
