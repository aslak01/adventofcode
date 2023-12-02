import { make_day } from "./make_day.ts";

async function main() {
  const start = performance.now();

  const day = Deno.args[0];
  await make_day(day);

  const finish = performance.now();
  const delta = finish - start;
  console.log(`Finished setting up day ${day} in ${delta} ms`);
}

main();
