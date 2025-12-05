import gleam/io
import gleeunit
import gleeunit/should

import day2

pub fn main() -> Nil {
  gleeunit.main()
}

const example_input = " 11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124 "

pub fn part_a_example_test() {
  let answer = "1227775554"
  io.println("Answer is: " <> answer)
  let solution = day2.solve(example_input, False)

  io.println("Calculation returned: " <> solution)

  should.equal(answer, solution)
}

pub fn part_b_example_test() {
  let answer = "4174379265"
  io.println("Answer is: " <> answer)
  let solution = day2.solve(example_input, True)

  io.println("Calculation returned: " <> solution)

  should.equal(answer, solution)
}
