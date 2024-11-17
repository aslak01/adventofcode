import gleam/io
import gleam/list
import gleam/result
import gleam/string
import simplifile
import solution1

pub fn main() {
  case read_input("./src/input.txt") {
    Ok(lines) -> {
      let sol = solution1.solve1(lines)
      io.debug(sol)
      Ok(Nil)
    }
    Error(error) -> {
      io.println("reading failed" <> error)
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
  io.println("hi mum")
  string.split(content, "\n")
  |> list.filter(fn(line) { line != "" })
}
