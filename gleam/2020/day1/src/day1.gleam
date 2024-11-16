import gleam/io
import gleam/list
import gleam/result
import gleam/string
import simplifile

pub fn main() {
  case read_input() {
    Ok(lines) -> {
      list.each(lines, io.debug)
      Ok(Nil)
    }
    Error(error) -> {
      io.println("reading failed" <> error)
      Error(Nil)
    }
  }
}

fn read_input() {
  simplifile.read(from: "./src/input.txt")
  |> result.map_error(fn(err) {
    case err {
      simplifile.Enoent -> "File not found"
      simplifile.Eacces -> "Permission denied"
      simplifile.Eisdir -> "Is a directory"
      _ -> "Unknown error"
    }
  })
  |> result.map(split_to_lines)
  // |> result.map(join_lines)
}

fn split_to_lines(content: String) -> List(String) {
  io.println("hi mum")
  string.split(content, "\n")
  |> list.filter(fn(line) { line != "" })
}
// fn join_lines(lines: List(String)) -> String {
//   io.println("hi mam")
//   string.join(lines, "\n")
// }
