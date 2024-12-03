import gleam/list
import gleam/result
import gleam/string

pub fn solve_1(input: List(String)) -> String {
  let strings = list.map(input, string.split(_, on: ":"))

  let _h = "hei"
}
// pub fn solve_2(input: List(String)) -> Result(Int, Nil) {
//   let numbers = list.filter_map(input, int.parse)
// }
