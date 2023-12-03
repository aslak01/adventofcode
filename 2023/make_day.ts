import { ensureDirSync } from "fs/mod.ts";
import { download_input } from "./download_input.ts";

export async function make_day(day: string) {
  const dayName = `d${day}`;

  ensureDirSync(`./${dayName}`);

  const input = await download_input(day);

  Deno.writeTextFileSync(`./${dayName}/input.ts`, input);

  ["a", "b"].map((pt) =>
    Deno.writeTextFileSync(
      `./${dayName}/test-${pt}.ts`,
      "export const test = [\n\n]",
    )
  );

  ["a", "b"].map((pt) =>
    Deno.writeTextFileSync(
      `./${dayName}/${pt}.ts`,
      `import { input } from "./input.ts"
import { test } from "./test-${pt}.ts";

const isTest = Deno.args[0];

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
