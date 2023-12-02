import { ensureDirSync } from "fs/mod.ts";
import { download_input } from "./download_input.ts";

export async function make_day(day: string) {
  const dayName = `d${day}`;

  ensureDirSync(`./${dayName}`);

  const input = await download_input(day);

  Deno.writeTextFileSync(`./${dayName}/input.ts`, input);
  Deno.writeTextFileSync(`./${dayName}/test.ts`, "export const test = [\n]");
  ["a", "b"].map((pt) =>
    Deno.writeTextFileSync(
      `./${dayName}/${pt}.ts`,
      `import { input } from "./input.ts"`,
    )
  );
}
