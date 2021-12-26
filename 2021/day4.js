const fs = require('fs')
const lines = fs
  .readFileSync('./day3.txt', 'utf-8')
  .trim()
  .split('\n')
  .filter((x) => Boolean(x))

// part 1
const bin2dec = (input) => {
  return parseInt(input, 2)
}

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
// console.log(summed)

const findMostCommon = (input, array) => (input / array.length >= 0.5 ? 1 : 0)

let avgs = summed.map((x) => (x / lines.length >= 0.5 ? 1 : 0)).join('')
let inverseAvgs = summed.map((x) => (x / lines.length < 0.5 ? 1 : 0)).join('')

console.log(
  'pt1:\n',
  'avgs:',
  bin2dec(avgs),
  'inv:',
  bin2dec(inverseAvgs),
  'factor:',
  bin2dec(avgs) * bin2dec(inverseAvgs)
)

// part 2
const length = lines[0].length

function getCount(lines) {
  const zeros = Array(length).fill(0)
  const ones = Array(length).fill(0)

  for (const line of lines) {
    const bits = [...line]
    bits.forEach((bit, index) => {
      if (bit === '0') {
        zeros[index]++
      } else {
        ones[index]++
      }
    })
  }

  return { zeros, ones }
}

function getORating(lines, index = 0) {
  const { zeros, ones } = getCount(lines)
  let mostCommonBit = '1'
  if (zeros[index] > ones[index]) {
    mostCommonBit = '0'
  }

  const filtered = lines.filter((line) => line[index] === mostCommonBit)
  if (filtered.length === 1) {
    return filtered[0]
  }
  return getORating(filtered, index + 1)
}
function getCO2Rating(lines, index = 0) {
  const { zeros, ones } = getCount(lines)
  let leastCommonBit = '0'
  if (zeros[index] > ones[index]) {
    leastCommonBit = '1'
  }
  const filtered = lines.filter((line) => line[index] === leastCommonBit)
  if (filtered.length === 1) {
    return filtered[0]
  }
  return getCO2Rating(filtered, index + 1)
}

function pt2() {
  const oxyRating = getORating(lines)
  const co2Rating = getCO2Rating(lines)
  console.log(parseInt(oxyRating, 2) * parseInt(co2Rating, 2))
}
pt2()
