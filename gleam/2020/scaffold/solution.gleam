import gleam/int
import gleam/list

pub fn solve_1(input: List(String)) -> Result(Int, Nil) {
  let numbers = list.filter_map(input, int.parse)
}

pub fn solve_2(input: List(String)) -> Result(Int, Nil) {
  let numbers = list.filter_map(input, int.parse)
}
