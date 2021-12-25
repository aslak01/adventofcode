const fs = require('fs')
const text = fs.readFileSync('./day3.txt', 'utf-8').trim()
let lines = text.split('\n')

// part 1
const transformStringsToArray = (input) => {
  return input.map((x) => Array.from(x))
}
const convertStringInArrToNumbers = (input) => {
  return input.map((l) => l.map((n) => parseInt(n)))
}

const sumAtIndex = (r, a) => r.map((b, i) => a[i] + b)

let summed = convertStringInArrToNumbers(transformStringsToArray(lines)).reduce(
  sumAtIndex
)
console.log(summed)

let avgs = summed.map((x) => (x / lines.length >= 0.5 ? 1 : 0)).join('')
let inverseAvgs = summed.map((x) => (x / lines.length <= 0.5 ? 1 : 0)).join('')
console.log(parseInt(avgs, 2) * parseInt(inverseAvgs, 2))
