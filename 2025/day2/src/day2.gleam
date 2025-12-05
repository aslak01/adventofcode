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
  io.println("Part A: " <> string.inspect(list.length(lines)) <> " lines")
  lines
  |> list.flat_map(fn(l) { string.split(l, ",") })
  |> list.flat_map(fn(l) { expand_range(l) })
  |> list.filter(fn(i) { is_halves_equal(i) })
  |> int.sum
  |> int.to_string
}

fn part_b(lines: List(String)) -> String {
  lines
  |> list.flat_map(fn(l) { string.split(l, ",") })
  |> list.flat_map(fn(l) { expand_range(l) })
  |> list.filter(fn(i) { is_repeated_pattern(i) })
  |> int.sum
  |> int.to_string
}

pub fn is_halves_equal(n: Int) -> Bool {
  let s = int.to_string(n)
  let len = string.length(s)

  case len % 2 {
    1 -> False
    // odd number of digits 
    _ -> {
      let half = len / 2
      let left = string.slice(s, 0, half)
      let right = string.slice(s, half, len)
      left == right
    }
  }
}

pub fn expand_range(s: String) -> List(Int) {
  let assert [min_s, max_s] = string.split(s, "-")
  let assert Ok(min) = int.parse(min_s)
  let assert Ok(max) = int.parse(max_s)

  list.range(min, max)
}

// part 2

/// Compute the LPS (Longest Proper Prefix which is also Suffix) array using KMP algorithm
pub fn compute_lps(s: String) -> List(Int) {
  let chars = string.to_graphemes(s)
  let len = list.length(chars)

  case len {
    0 -> []
    _ -> compute_lps_loop(chars, list.repeat(0, len), 0, 1, len)
  }
}

fn compute_lps_loop(
  chars: List(String),
  lps: List(Int),
  length: Int,
  i: Int,
  n: Int,
) -> List(Int) {
  case i >= n {
    True -> lps
    False -> {
      let char_i = get_at(chars, i)
      let char_len = get_at(chars, length)

      case char_i == char_len {
        True -> {
          let new_length = length + 1
          let new_lps = set_at(lps, i, new_length)
          compute_lps_loop(chars, new_lps, new_length, i + 1, n)
        }
        False -> {
          case length != 0 {
            True -> {
              let prev_length = get_at_int(lps, length - 1)
              compute_lps_loop(chars, lps, prev_length, i, n)
            }
            False -> {
              let new_lps = set_at(lps, i, 0)
              compute_lps_loop(chars, new_lps, 0, i + 1, n)
            }
          }
        }
      }
    }
  }
}

fn get_at(lst: List(String), idx: Int) -> String {
  case list.drop(lst, idx) {
    [x, ..] -> x
    [] -> ""
  }
}

fn get_at_int(lst: List(Int), idx: Int) -> Int {
  case list.drop(lst, idx) {
    [x, ..] -> x
    [] -> 0
  }
}

fn set_at(lst: List(Int), idx: Int, val: Int) -> List(Int) {
  list.index_map(lst, fn(x, i) {
    case i == idx {
      True -> val
      False -> x
    }
  })
}

pub fn is_repeated_pattern(n: Int) -> Bool {
  let s = int.to_string(n)
  let len = string.length(s)

  case len {
    0 -> False
    1 -> False
    _ -> {
      let lps = compute_lps(s)
      let last_lps = get_at_int(lps, len - 1)
      let pattern_len = len - last_lps

      // Valid repeated pattern if:
      // 1. pattern_len divides len evenly
      // 2. pattern_len is less than len (so there's at least 2 repetitions)
      case pattern_len < len && len % pattern_len == 0 {
        True -> True
        False -> False
      }
    }
  }
}
