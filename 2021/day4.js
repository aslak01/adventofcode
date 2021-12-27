const fs = require('fs')
const lines = fs.readFileSync('./day4.txt', 'utf-8').trim().split('\n\n')

let numbers = lines
  .shift()
  .split(',')
  .map((x) => parseInt(x.trim(' ')))

let boards = lines.map((x) => x.split('\n'))

let test = boards.map((x) => x.map((n) => n.split(' ').map((x) => parseInt(x))))
test = test.map((x) => x.map((n) => n.filter((n) => n || n === 0)))

// test = test.map((b) => b.map((x) => x.map((n) => parseInt(n))))

console.log(boards[0])

console.log(test[0][0][0])

console.log(typeof test[0][0][0])
