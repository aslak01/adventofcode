import gleam/int
import gleam/io
import gleam/string
import gleeunit
import gleeunit/should

import day3

pub fn main() -> Nil {
  gleeunit.main()
}

const example_input = "
987654321111111
811111111111119
234234234234278
818181911112111
"

const answer_a = 357

const answer_b = 3_121_910_778_619

pub fn part_a_example_test() {
  io.println("Answer is: " <> string.inspect(answer_a))
  let solution = day3.solve(example_input, False)

  should.equal(answer_a, solution)

  io.println(
    "Calculation returned: "
    <> solution
    |> int.to_string,
  )
}

pub fn part_b_example_test() {
  let solution = day3.solve(example_input, True)

  should.equal(answer_b, solution)

  io.println(
    "Calculation returned: "
    <> solution
    |> int.to_string,
  )
}
