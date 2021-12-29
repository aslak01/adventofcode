const fs = require('fs')
const file = fs.readFileSync('./day5.txt', 'utf-8')

const day = (file) => {
  // cleanup
  const lines = file.trim().split('\n\n')

  const numbers = lines
    .shift()
    .split(',')
    .map((n) => parseInt(n))
}

day(file)
