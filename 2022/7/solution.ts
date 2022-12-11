import { parse } from "../parse.ts";
const puzzle = parse(await Deno.readTextFile("./input.txt")).entries;
const example = parse(await Deno.readTextFile("./example.txt")).entries;

interface DirFile {
  name: string;
  size: number;
}
interface Directory {
  size: number;
  files: DirFile[];
  name: string;
}
interface TraversedDir {
  files: Directory;
  newI: number;
  directories: Directory[];
}

const maxDirSize = 100000;
const hdSize = 70000000;
const updateSize = 30000000;

const solve = (input: string[]) => {
  const traverse = (input: string[], from = 0, name = "/"): TraversedDir => {
    const dir: Directory = {
      size: 0,
      files: [],
      name,
    };
    const dirs: Directory[] = [];

    let i = from;
    for (i; i < input.length; i++) {
      const cmd = input[i].split(" ");

      if (cmd[0] === "$") {
        if (cmd[1] === "cd") {
          if (cmd[2] === "..") {
            return { files: dir, newI: i, directories: dirs };
          } else if (cmd[2] !== "/") {
            const { files, newI, directories } = traverse(input, i + 1, cmd[2]);
            dirs.push(files);
            dirs.push(...directories);
            i = newI;
            if (files) {
              dir.files.push(files);
              dir.size += files.size;
            }
          }
        }
      } else if (!isNaN(parseInt(cmd[0]))) {
        const size = parseInt(cmd[0]);
        dir.size += size;
        dir.files.push({
          name: cmd[1],
          size,
        });
      }
    }
    return { files: dir, newI: i, directories: dirs };
  };

  const { files, directories } = traverse(input);

  directories.sort((a, b) => a.size - b.size);
  const sum = directories.reduce((acc, dir) => {
    if (dir.size < maxDirSize) {
      return acc + dir.size;
    }
    return acc;
  }, 0);
  console.log("1: ", sum);

  const diskSpaceRemaining = hdSize - files.size;
  const requiredSpace = updateSize - diskSpaceRemaining;

  const smallestDirToDelete = directories.find(
    (dir) => dir.size >= requiredSpace,
  );

  console.log("2: ", smallestDirToDelete);
};

solve(puzzle);
