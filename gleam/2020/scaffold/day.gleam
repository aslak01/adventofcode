import argv
import gleam/io
import gleam/list
import gleam/result
import gleam/string
import simplifile
import solution

pub fn main() {
  case argv.load().arguments {
    ["1"] ->
      Ok(
        read_input("./src/input.txt")
        |> result.map(solution.solve_1)
        |> result.map(io.debug),
      )
    ["2"] ->
      Ok(
        read_input("./src/input.txt")
        |> result.map(solution.solve_2)
        |> result.map(io.debug),
      )
    _ -> {
      io.println("sorry, try 1 or 2")
      Error(Nil)
    }
  }
}

fn read_input(path: String) {
  simplifile.read(from: path)
  |> result.map_error(fn(err) {
    case err {
      simplifile.Enoent -> "File not found"
      simplifile.Eacces -> "Permission denied"
      simplifile.Eisdir -> "Is a directory"
      _ -> "Unknown error"
    }
  })
  |> result.map(split_to_lines)
}

fn split_to_lines(content: String) -> List(String) {
  string.split(content, "\n")
  |> list.filter(fn(line) { line != "" })
}
