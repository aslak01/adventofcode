import gleam/int
import gleam/io
import gleeunit
import gleeunit/should

// Import your day module to test the solve function
import day5

pub fn main() -> Nil {
  gleeunit.main()
}

const example_input = "
3-5
10-14
16-20
12-18

1
5
8
11
17
32
"

const answer_a = 3

const answer_b = 2

pub fn part_a_example_test() {
  let solution = day5.solve(example_input, False)

  should.equal(answer_a, solution)

  io.println(
    "Calculation returned: "
    <> solution
    |> int.to_string,
  )
}

pub fn part_b_example_test() {
  let solution = day5.solve(example_input, True)

  should.equal(answer_b, solution)

  io.println(
    "Calculation returned: "
    <> solution
    |> int.to_string,
  )
}
