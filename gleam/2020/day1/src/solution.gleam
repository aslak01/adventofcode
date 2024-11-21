import gleam/int
import gleam/list
import gleam/result
import gleam/set

pub fn solve_1(input: List(String)) -> Result(Int, Nil) {
  let numbers = list.filter_map(input, int.parse)

  find_pair(numbers)
  |> result.map(fn(pair) {
    let #(a, b) = pair
    a * b
  })
}

pub fn solve_2(input: List(String)) -> Result(Int, Nil) {
  let numbers = list.filter_map(input, int.parse)

  find_triple(numbers)
  |> result.map(fn(triple) {
    let #(a, b, c) = triple
    a * b * c
  })
}

fn find_pair(numbers: List(Int)) -> Result(#(Int, Int), Nil) {
  // Convert list to set for O(1) lookups
  let num_set = set.from_list(numbers)

  list.find_map(numbers, fn(num) {
    let complement = 2020 - num
    case set.contains(num_set, complement) {
      True -> Ok(#(num, complement))
      False -> Error(Nil)
    }
  })
}

pub fn find_triple(numbers: List(Int)) -> Result(#(Int, Int, Int), Nil) {
  let num_set = set.from_list(numbers)

  // For each pair of numbers, check if their complement exists
  list.find_map(numbers, fn(first) {
    list.find_map(numbers, fn(second) {
      let complement = 2020 - first - second
      // Make sure we don't reuse the same number
      case
        complement != first
        && complement != second
        && set.contains(num_set, complement)
      {
        True -> Ok(#(first, second, complement))
        False -> Error(Nil)
      }
    })
  })
}
