export interface Puzzle {
  entries: string[];
  blocks: string[][][];
}
export const parse = (input: string): Puzzle => {
  const entries = input.split("\n");
  const blocks: string[][][] = [];
  if (entries[entries.length - 1] == "") entries.pop();
  entries.forEach((entry, index) => {
    if (entry.length == 0 || index == 0) blocks.push([]);
    if (entry.length == 0) return false;
    const separator = [" | ", " -> ", " ", ","].filter(
      (s) => entry.split(s).length > 1,
    );
    const columns: string[] = [];
    if (separator.length > 0) {
      entry
        .split(separator[0])
        .filter((column) => column != "")
        .forEach((column) => columns.push(column));
    } else {
      columns.push(entry);
    }
    blocks[blocks.length - 1].push(columns);
  });
  return {
    entries,
    blocks,
  };
};
