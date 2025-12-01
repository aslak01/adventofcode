import argv
import gleam/int
import gleam/io
import gleam/list
import gleam/result
import gleam/string
import simplifile

const start_point = 50

pub fn main() -> Nil {
  let args = argv.load().arguments
  let is_part_b = list.contains(args, "-b")

  case simplifile.read("input.txt") {
    Ok(input) -> solve(input, is_part_b)
    Error(_) -> io.println("Error: Could not read input.txt")
  }
}

fn solve(input: String, is_part_b: Bool) -> Nil {
  case is_part_b {
    True -> part_b(input)
    False -> part_a(input)
  }
}

fn part_a(input: String) -> Nil {
  io.println("Part A:")
  // io.println(input)
  let lines =
    string.trim(input)
    |> string.split("\n")

  let parsed = list.map(lines, parse_instruction)

  // debug 
  parsed
  |> list.take(5)
  |> list.each(fn(x) { io.println(string.inspect(x)) })

  parsed
  |> result.values
  |> solver
  |> fn(x) { io.println(string.inspect(x)) }

  Nil
}

fn part_b(input: String) -> Nil {
  io.println("Part B:")
  let lines =
    string.trim(input)
    |> string.split("\n")

  let parsed = list.map(lines, parse_instruction)

  parsed
  |> result.values
  |> solver_b
  |> fn(x) { io.println(string.inspect(x)) }
}

fn parse_instruction(s: String) -> Result(#(String, Int), Nil) {
  case string.pop_grapheme(s) {
    Ok(#(char, rest)) -> {
      case int.parse(rest) {
        Ok(num) -> Ok(#(char, num))
        Error(_) -> Error(Nil)
      }
    }
    Error(_) -> Error(Nil)
  }
}

fn solver(instructions: List(#(String, Int))) -> #(Int, Int) {
  let #(pos, count) =
    list.fold(instructions, #(start_point, 0), fn(acc, instruction) {
      let #(pos, count) = acc
      let #(dir, amount) = instruction

      let new_pos = case dir {
        "R" -> pos + amount
        "L" -> pos - amount
        _ -> pos
      }
      // Lands on 0 when divisible by 100
      let new_count = case new_pos % 100 == 0 {
        True -> count + 1
        False -> count
      }

      #(new_pos, new_count)
    })

  #(count, { pos % 100 + 100 } % 100)
}

fn solver_b(instructions: List(#(String, Int))) -> Int {
  let #(_, count) =
    list.fold(instructions, #(start_point, 0), fn(acc, inst) {
      let #(pos, count) = acc
      let #(dir, amount) = inst

      let new_pos = case dir {
        "R" -> pos + amount
        "L" -> pos - amount
        _ -> pos
      }

      let passes =
        int.absolute_value(floor_div(new_pos, 100) - floor_div(pos, 100))

      #(new_pos, count + passes)
    })

  count
}

fn floor_div(a: Int, b: Int) -> Int {
  case a >= 0 {
    True -> a / b
    False -> { a - b + 1 } / b
  }
}
