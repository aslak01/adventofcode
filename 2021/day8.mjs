import fs from 'fs'
const file = fs.readFileSync('./day8.txt', 'utf-8')
const day8 = (file) => {
  const lines = file.trim()
  console.log(lines)
}

day8(file)
