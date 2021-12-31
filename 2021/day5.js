const fs = require('fs')
const file = fs.readFileSync('./day5.txt', 'utf-8')

const day = (file) => {
  const lines = file.trim().split('\n')

  const vents = lines.map((line) =>
    line.split(/[^\d]+/).map((num) => parseInt(num))
  )

  console.log(vents)

  const map = []

  const setPoint = (x, y) => {
    map[y] = map[y] || []
    map[y][x] = map[y][x] || 0
    return ++map[y][x]
  }

  let overlaps = 0

  for (const [x1, y1, x2, y2] of vents) {
    // part 1
    if (x1 != x2 && y1 != y2) {
      continue
    }

    let [x, y] = [x1, y1]

    while (true) {
      if (setPoint(x, y) === 2) {
        overlaps++
      }

      if (x === x2 && y === y2) {
        break
      }

      if (x2 > x1) {
        x++
      } else if (x2 < x1) {
        x--
      }

      if (y2 > y1) {
        y++
      } else if (y2 < y1) {
        y--
      }
    }
  }

  console.log('result:', overlaps)

  // const makeObjects = (data) => {
  //   const linesObjs = []
  //   for (let i = 0; i < data.length; i++) {
  //     const line = data[i].split(' -> ')
  //     const x1 = parseInt(line[0].split(',')[0])
  //     const y1 = parseInt(line[0].split(',')[1])
  //     const x2 = parseInt(line[1].split(',')[0])
  //     const y2 = parseInt(line[1].split(',')[1])
  //     const obj = { x1, y1, x2, y2 }
  //     linesObjs.push(obj)
  //   }
  //   return linesObjs
  // }
  // const lineObjs = makeObjects(lines)
  // // console.log(lineObjs)
  // const findLowest = (array, param) =>
  //   array.reduce((prev, curr) => (prev[param] < curr[param] ? prev : curr))
  // const findHighest = (array, param) =>
  //   array.reduce((prev, curr) => (prev[param] > curr[param] ? prev : curr))

  // const extents = {
  //   min: {
  //     x1: findLowest(lineObjs, 'x1').x1,
  //     x2: findLowest(lineObjs, 'x2').x2,
  //     y1: findLowest(lineObjs, 'y1').y1,
  //     y2: findLowest(lineObjs, 'y2').y2,
  //   },
  //   max: {
  //     x1: findHighest(lineObjs, 'x1').x1,
  //     x2: findHighest(lineObjs, 'x2').x2,
  //     y1: findHighest(lineObjs, 'y1').y1,
  //     y2: findHighest(lineObjs, 'y2').y2,
  //   },
  // }
  // // console.log(extents)
  // const plotLines = (lines) => {
  //   let linesArray = []

  //   for (let i = 0; i < lines.length; i++) {
  //     const x1 = Math.min(lines[i].x1, lines[i].x2)
  //     const x2 = Math.max(lines[i].x2, lines[i].x1)
  //     const y1 = Math.min(lines[i].y1, lines[i].y2)
  //     const y2 = Math.max(lines[i].y2, lines[i].y1)

  //     const deltaX = Math.abs(x2 - x1)
  //     const deltaY = Math.abs(y2 - y1)

  //     let x = x1
  //     let y = y1
  //     // only straight lines
  //     if ((deltaX > 0 && deltaY === 0) || (deltaY > 0 && deltaX === 0)) {
  //       const plottedLines = {
  //         id: i,
  //         deltaX,
  //         deltaY,
  //         x1,
  //         x2,
  //         y1,
  //         y2,
  //         lines: [],
  //       }
  //       while (x < x2 || y < y2) {
  //         plottedLines.lines.push({ x, y })
  //         if (x < x2) {
  //           x++
  //         }
  //         if (y < y2) {
  //           y++
  //         }
  //       }
  //       linesArray.push(plottedLines)
  //     }
  //   }
  //   // linesArray = linesArray.map((line, index) => (line[index] = index))
  //   // console.log(linesArray)
  //   return linesArray
  // }
  // const plottedLines = plotLines(lineObjs)
  // // check 1 dim plotted line
  // // console.log(plottedLines)
  // const deltaXs = plottedLines.filter((line) => line.deltaX > 0).length
  // const deltaYs = plottedLines.filter((line) => line.deltaY > 0).length
  // console.log('Xs', deltaXs, 'Ys', deltaYs)
  // // check 2 dim plotted line
  // const short2dimLines = plottedLines.filter(
  //   (line) =>
  //     line.deltaX > 2 && line.deltaY > 2 && line.deltaX < 50 && line.deltaY < 50
  // )
  // // console.log(short2dimLines)
  // // console.log(plottedLines)
  // const findOverlaps = (lines) => {
  //   let overlaps = lines.map((l) => l.lines).flat()
  //   overlaps = overlaps.filter((o) => o.x !== undefined && o.y !== undefined)
  //   console.log('individual lines:', overlaps.length)
  //   const test = overlaps.map((o) => o.x + ',' + o.y)
  //   // console.log(test)
  //   function getMostFrequent(arr) {
  //     const hashmap = arr.reduce((acc, val) => {
  //       acc[val] = (acc[val] || 0) + 1
  //       return acc
  //     }, {})
  //     return Object.keys(hashmap).reduce((a, b) =>
  //       hashmap[a] > hashmap[b] ? a : b
  //     )
  //   }
  //   const mostFrequent = getMostFrequent(test)
  //   console.log('most intersected point:', mostFrequent)

  //   const occurrences = test.reduce(function (acc, curr) {
  //     return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc
  //   }, {})
  //   // console.log(occurrences)

  //   const counts = {}

  //   for (const num of test) {
  //     counts[num] = (counts[num] || 0) + 1
  //   }

  //   const atLeastTwice = (arr) => {
  //     let atLeastTwice = 0
  //     Object.values(arr).forEach((count) => {
  //       if (count > 1) {
  //         atLeastTwice++
  //       }
  //     })
  //     return atLeastTwice
  //   }

  //   console.log('most intersections:', occurrences[mostFrequent])
  //   console.log('atleastTwice', atLeastTwice(occurrences))
  //   // console.log(counts)

  //   // 180012, 20104 too high
  //   // 5549 too low
  // }
  // findOverlaps(plottedLines)
}

day(file)
