import argv
import gleam/int
import gleam/io
import gleam/list
import gleam/string
import simplifile

pub fn main() -> Nil {
  let args = argv.load().arguments
  let is_part_b = list.contains(args, "-b")

  case simplifile.read("input.txt") {
    Ok(input) -> solve(input, is_part_b) |> int.to_string |> io.println
    Error(_) -> io.println("Error: Could not read input.txt")
  }
}

pub fn solve(input: String, is_part_b: Bool) -> Int {
  let lines =
    string.trim(input)
    |> string.split("\n")

  case is_part_b {
    True -> part_b(lines)
    False -> part_a(lines)
  }
}

fn part_a(lines: List(String)) -> Int {
  let digits =
    lines
    |> list.map(string.to_graphemes)
    |> list.map(list.filter_map(_, int.parse))
    |> list.map(fn(xs) { top_n_in_order(xs, 2) })
    |> list.map(fn(nums) { nums |> list.map(int.to_string) |> string.concat })

  let result =
    digits
    |> list.filter_map(int.parse)
    |> int.sum

  list.map(digits, fn(ln) { io.println(string.inspect(ln)) })

  result
}

fn part_b(lines: List(String)) -> Int {
  let digits =
    lines
    |> list.map(string.to_graphemes)
    |> list.map(list.filter_map(_, int.parse))
    |> list.map(fn(xs) { top_n_in_order(xs, 12) })
    |> list.map(fn(nums) { nums |> list.map(int.to_string) |> string.concat })

  let result =
    digits
    |> list.filter_map(int.parse)
    |> int.sum

  list.map(digits, fn(ln) { io.println(string.inspect(ln)) })

  result
}

fn top_n_in_order(nums: List(Int), n: Int) -> List(Int) {
  let len = list.length(nums)
  let to_remove = len - n
  case to_remove <= 0 {
    True -> nums
    False -> {
      let result = do_top_n(nums, [], to_remove)
      list.take(result, n)
    }
  }
}

fn do_top_n(remaining: List(Int), stack: List(Int), to_remove: Int) -> List(Int) {
  case remaining {
    [] -> list.reverse(stack)
    [digit, ..rest] -> {
      let #(new_stack, new_to_remove) = drop_smaller(stack, digit, to_remove)
      do_top_n(rest, [digit, ..new_stack], new_to_remove)
    }
  }
}

fn drop_smaller(
  stack: List(Int),
  digit: Int,
  to_remove: Int,
) -> #(List(Int), Int) {
  case to_remove > 0, stack {
    True, [top, ..rest] if top < digit ->
      drop_smaller(rest, digit, to_remove - 1)
    _, _ -> #(stack, to_remove)
  }
}
