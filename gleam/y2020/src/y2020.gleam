import argv
import dot_env as dot
import gleam/erlang/os
import gleam/http/request
import gleam/http/response
import gleam/httpc
import gleam/io
import gleam/result
import gleam/string
import gleeunit/should

pub fn main() {
  dot.new()
  |> dot.set_path(".env")
  |> dot.set_debug(False)
  |> dot.load

  case argv.load().arguments {
    [day] -> setup_day(day)
    _ -> io.println("Usage: aoc <day>")
  }
}

fn setup_day(day: String) -> Nil {
  let session = get_session()
  let year = get_year()

  case session, year {
    Ok(s), Ok(y) -> {
      download_input(y, day, s)
      |> fn(result) {
        case result {
          Ok(input) -> io.print(string.inspect(input))
          Error(e) -> io.print_error(string.inspect(e))
        }
      }
    }
    Error(e), _ -> io.println(e)
    _, Error(e) -> io.println(e)
  }
}

fn get_session() -> Result(String, String) {
  os.get_env("AOC_SESSION")
  |> result.replace_error("AOC_SESSION environment variable not found")
  |> result.map(string.trim)
}

fn get_year() -> Result(String, String) {
  os.get_env("AOC_YEAR")
  |> result.replace_error("AOC_YEAR environment variable not found")
  |> result.map(string.trim)
}

pub fn download_input(year: String, day: String, session: String) {
  let url =
    string.concat(["https://adventofcode.com/", year, "/day/", day, "/input"])

  let assert Ok(base_req) = request.to(url)

  let req =
    request.prepend_header(
      base_req,
      "cookie",
      string.concat(["session=", session]),
    )
  use resp <- result.try(httpc.send(req))

  resp.status
  |> should.equal(200)

  resp
  |> response.get_header("content-type")
  |> should.equal(Ok("text/plain"))

  let formatted_resp =
    resp.body
    |> string.replace("\"", "")
    |> string.replace("%", "")
    |> string.replace("\\n", "\n")

  Ok(formatted_resp)
}
