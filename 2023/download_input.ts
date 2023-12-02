import { load } from "dotenv/mod.ts";

const env = await load();
const cookie = env["COOKIE"];
const headers = new Headers({ cookie });

export async function download_input(day: string) {
  const url = `https://adventofcode.com/2023/day/${day}/input`;
  const req = await fetch(url, {
    headers,
  });
  const input = await req.text();
  const parsedInput = input.trim().split("\n").map((l) => `"${l}"`);
  console.log(`Parsed ${parsedInput.length} lines of input`);
  return `export const input = [${parsedInput}]`;
}
