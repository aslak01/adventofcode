const cookie = process.env.COOKIE;
const ua = "github.com/aslak01/adventofcode/tree/master/2023";
const headers = new Headers({ cookie, "user-agent": ua });

export async function download_input(day: string) {
  const url = `https://adventofcode.com/2023/day/${day}/input`;
  const req = await fetch(url, {
    headers,
  });
  const input = await req.text();
  return input.trim();
  // const parsedInput = input.trim().split("\n").map((l) => `"${l}"`);
  // console.log(`Parsed ${parsedInput.length} lines of input`);
  // return `export const input = [${parsedInput}]`;
}
