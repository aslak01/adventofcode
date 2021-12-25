const fs = require('fs')
const text = fs.readFileSync('./day2.txt', 'utf-8').trim()
let lines = text.split('\n')

// part 1
const positionFigurer = (input) => {
  let depth = 0,
    position = 0

  const directionChecker = (input) => {
    input = input.split(' ')
    if (input[0] === 'forward') {
      position += Number(input[1])
    }
    if (input[0] === 'down') {
      depth += Number(input[1])
    }
    if (input[0] === 'up') {
      depth -= Number(input[1])
    }
  }

  input.map((line) => {
    directionChecker(line)
  })
  console.log('pos.', position, 'depth', depth, 'factor', position * depth)
}

positionFigurer(lines)

// part 2

const modifiedPositionFigurer = (input) => {
  let depth = 0
  let position = 0
  let aim = 0
  const directionChecker = (input) => {
    input = input.split(' ')
    if (input[0] === 'forward') {
      position += Number(input[1])
      depth += aim * Number(input[1])
    }
    if (input[0] === 'down') {
      aim += Number(input[1])
    }
    if (input[0] === 'up') {
      aim -= Number(input[1])
    }
  }
  input.map((i) => {
    directionChecker(i)
  })
  console.log('pos.', position, 'depth', depth, 'factor', position * depth)
}

modifiedPositionFigurer(lines)
