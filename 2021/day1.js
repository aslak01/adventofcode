var fs = require('fs')
var text = fs.readFileSync('./day1.txt', 'utf-8')
var textByLine = text.split('\n')

textByLine = textByLine.map((n) => parseInt(n))

let increases = 1
for (let i = 0; i < textByLine.length; i++) {
  if (i > 0) {
    if (textByLine[i] > textByLine[i - 1]) {
      increases++
    }
  }
}

console.log(increases)
