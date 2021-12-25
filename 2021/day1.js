const fs = require('fs')
const text = fs.readFileSync('./day1.txt', 'utf-8').trim()
let line = text.split('\n')

line = line.map((x) => Number(x))

const increaseChecker = (input) => {
  let increases = 0
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      increases++
    }
  }
  console.log(increases)
}

increaseChecker(line)

let threeMeasureArr = []
for (let i = 0; i < line.length; i++) {
  let threeMeasure = 0
  if (i < line.length - 2) {
    threeMeasure = line[i] + line[i + 1] + line[i + 2]
    threeMeasureArr.push(threeMeasure)
  }
}

increaseChecker(threeMeasureArr)
