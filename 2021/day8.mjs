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
    const codes = {
      0: 'cagedb',
      1: 'ab',
    }
    const list4letterCodes = (arr) => {
      let outp = []
      arr.forEach((a) => {
        a.split(' ').forEach((w) => {
          if (w.length === 2) outp.push(w)
        })
      })
      return outp
    }
    return list4letterCodes(arr)
  }

  const pt2 = sumOutput(outputValues)
  console.log(pt2)
}

day8(file)
