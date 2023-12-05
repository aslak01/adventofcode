import { make_day } from "./make_day.ts";
const day = Bun.argv[2];

async function main(day: string) {
  const start = performance.now();

  await make_day(day);

  const finish = performance.now();
  const delta = finish - start;
  console.log(`Finished setting up day ${day} in ${delta} ms`);
}

main(day);
