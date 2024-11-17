import gleam/int
import gleam/list
import gleam/result
import gleam/set

pub fn solve1(input: List(String)) -> Result(Int, Nil) {
  let numbers = list.filter_map(input, int.parse)

  find_pair(numbers)
  |> result.map(fn(pair) {
    let #(a, b) = pair
    a * b
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
