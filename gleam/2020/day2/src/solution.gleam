import gleam/int
import gleam/list
import gleam/result

pub fn solve_1(input: List(String)) -> Result(Int, Nil) {
  let numbers = list.filter_map(input, int.parse)
  numbers
  [0]
}

pub fn solve_2(input: List(String)) -> Result(Int, Nil) {
  let numbers = list.filter_map(input, int.parse)
}
