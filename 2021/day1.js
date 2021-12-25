const fs = require('fs')
const text = fs.readFileSync('./day1.txt', 'utf-8').trim()
let lines = text.split('\n')

lines = lines.map((x) => parseInt(x))

// part 1
function increaseChecker(input) {
  let increases = 0
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      increases++
    }
  }
  console.log(increases)
}
increaseChecker(lines)

// part 2
function threeSeriesMeasurer(input) {
  let threeMeasureArr = []
  for (let i = 0; i < lines.length; i++) {
    let threeMeasure = 0
    if (i < lines.length - 2) {
      threeMeasure = lines[i] + lines[i + 1] + lines[i + 2]
      threeMeasureArr.push(threeMeasure)
    }
  }
  increaseChecker(threeMeasureArr)
}

threeSeriesMeasurer(lines)
