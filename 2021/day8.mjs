import fs from 'fs'
const file = fs.readFileSync('./day8.txt', 'utf-8')
const day8 = (file) => {
  const lines = file.trim()
  // console.log(lines)
  const linesArray = lines.split('\n')
  const outputValues = linesArray.map((l) => l.split(' | ')[1])
  console.log(outputValues)
  const uniques = [7, 4, 3, 2]
  const countUniques = (arr) => {
    let count = 0
    arr.forEach((a) => {
      a.split(' ').forEach((w) => {
        if (uniques.includes(w.length)) count++
      })
    })
    return count
  }
  console.log(countUniques(outputValues))

  const sumOutput = (arr) => {
    // len 2 = 1
    // len 3 = 7
    // len 4 = 4
    // len 5 = 8
    // Positions
    //    333
    //   6   1
    //   6   1
    //    444
    //   7   2
    //   7   2
    //    555
    //
    // 1: 1, 2
    // 4: 1, 2, 4, 6
    // 7: 1, 2. 3
    // 8: 1, 2, 3, 4, 5, 6, 7
    const codes = {
      0: 'cagedb',
      1: 'ab',
    }
    const list4letterCodes = (arr, len = [7, 4, 3, 2]) => {
      let outp = []
      arr.forEach((a) => {
        a.split(' ').forEach((w) => {
          if (w.length === len) outp.push(w)
        })
      })
      return outp
    }
    return list4letterCodes(arr)
  }

  const pt2 = sumOutput(linesArray)
  console.log(pt2)
}

day8(file)
