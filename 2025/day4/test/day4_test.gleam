import day4

import gleam/int
import gleam/io
import gleeunit
import gleeunit/should

pub fn main() -> Nil {
  gleeunit.main()
}

const example_input = "
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
"

const answer_a = 13

const answer_b = 2

pub fn part_a_example_test() {
  let solution = day4.solve(example_input, False)

  should.equal(answer_a, solution)

  io.println(
    "Calculation returned: "
    <> solution
    |> int.to_string,
  )
}

pub fn part_b_example_test() {
  let solution = day4.solve(example_input, True)

  should.equal(answer_b, solution)

  io.println(
    "Calculation returned: "
    <> solution
    |> int.to_string,
  )
}
