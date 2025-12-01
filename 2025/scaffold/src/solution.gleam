import argv
import gleam/io
import gleam/list
import gleam/string
import simplifile

pub fn main() -> Nil {
  let args = argv.load().arguments
  let is_part_b = list.contains(args, "-b")

  case simplifile.read("input.txt") {
    Ok(input) -> solve(input, is_part_b) |> io.println
    Error(_) -> io.println("Error: Could not read input.txt")
  }
}

pub fn solve(input: String, is_part_b: Bool) -> String {
  let lines =
    string.trim(input)
    |> string.split("\n")

  case is_part_b {
    True -> part_b(lines)
    False -> part_a(lines)
  }
}

fn part_a(lines: List(String)) -> String {
  // TODO: implement part a
  "Part A: " <> string.inspect(list.length(lines)) <> " lines"
}

fn part_b(lines: List(String)) -> String {
  // TODO: implement part b
  "Part B: " <> string.inspect(list.length(lines)) <> " lines"
}
