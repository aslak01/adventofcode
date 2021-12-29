const fs = require('fs')
const file = fs.readFileSync('./day5.txt', 'utf-8')

const day = (file) => {
  const lines = file.trim().split('\n')

  const makeObjects = (data) => {
    const linesObjs = []
    for (let i = 0; i < data.length; i++) {
      const line = data[i].split(' -> ')
      const x1 = parseInt(line[0].split(',')[0])
      const y1 = parseInt(line[0].split(',')[1])
      const x2 = parseInt(line[1].split(',')[0])
      const y2 = parseInt(line[1].split(',')[1])
      const obj = { x1, y1, x2, y2 }
      linesObjs.push(obj)
    }
    return linesObjs
  }
  const lineObjs = makeObjects(lines)
  console.log(lineObjs)
  const findLowest = (array, param) =>
    array.reduce((prev, curr) => (prev[param] < curr[param] ? prev : curr))
  const findHighest = (array, param) =>
    array.reduce((prev, curr) => (prev[param] > curr[param] ? prev : curr))

  const extents = {
    min: {
      x1: findLowest(lineObjs, 'x1').x1,
      x2: findLowest(lineObjs, 'x2').x2,
      y1: findLowest(lineObjs, 'y1').y1,
      y2: findLowest(lineObjs, 'y2').y2,
    },
    max: {
      x1: findHighest(lineObjs, 'x1').x1,
      x2: findHighest(lineObjs, 'x2').x2,
      y1: findHighest(lineObjs, 'y1').y1,
      y2: findHighest(lineObjs, 'y2').y2,
    },
  }
  console.log(extents)
}

day(file)
