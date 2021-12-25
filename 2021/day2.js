const fs = require('fs')
const text = fs.readFileSync('./day2.txt', 'utf-8').trim()
let lines = text.split('\n')

// lines = lines.map((x) => Number(x))

console.log(lines)
