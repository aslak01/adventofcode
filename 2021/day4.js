const fs = require('fs')
const file = fs.readFileSync('./day4.txt', 'utf-8')

const day4pt1 = (file) => {
  const lines = file.trim().split('\n\n')

  const numbers = lines
    .shift()
    .split(',')
    .map((n) => parseInt(n))

  // boards split at newline
  let boards = lines.map((x) => x.split('\n'))
  // boards split at space and int parsed
  boards = boards.map((x) => x.map((n) => n.split(' ').map((x) => parseInt(x))))
  // removing NaNs from boards where single digits had leading zeroes
  boards = boards.map((x) => x.map((n) => n.filter((n) => n || n === 0)))

  // console.log(boards, numbers)

  const findBingo = (numbers, board, boardnumber) => {
    const boardID = boardnumber

    const findRows = (board) => {
      const cols = board
      let rows = []
      for (let i = 0; i < board.length; i++) {
        rows.push(board[i])
      }
      return { rows, cols }
    }
    const rows = findRows(board).rows
    const cols = findRows(board).cols

    // console.log(rows, cols, boardID, board)
    // const diag1 = board.map((x, i) => x[i])
    // const diag2 = board.map((x, i) => x[board.length - 1 - i])
    let winners
    for (row of rows) {
      if (
        row.every((x) => numbers.includes(x))
        // || diag1.every((x) => numbers.includes(x)) ||
        // diag2.every((x) => numbers.includes(x)))
      ) {
        const numberIndexes = row.map((x) => numbers.indexOf(x))
        const sumofIndexes = numberIndexes.reduce((a, b) => a + b)
        winners = { boardID: { row, numberIndexes, sumofIndexes } }
      }
    }
    for (col of cols) {
      if (col.every((x) => numbers.includes(x))) {
        const numberIndexes = col.map((x) => numbers.indexOf(x))
        const sumofIndexes = numberIndexes.reduce((a, b) => a + b)
        winners = { [boardID]: { col, numberIndexes, sumofIndexes } }
      }
      // console.log(winners)
    }
    return winners
  }

  const searchBoards = (numbers, boards) => {
    let winners = []
    for (const [index, board] of boards.entries()) {
      winners.push(findBingo(numbers, board, index))
    }
    return winners
  }
  const winners = searchBoards(numbers, boards)
  console.log(winners)
  const findFirst = (array) =>
    array.reduce((prev, curr) =>
      prev.sumofIndexes < curr.sumofIndexes ? prev : curr
    )
  const firstWinner = findFirst(winners)
  console.log('firstWinner', firstWinner)
}

day4pt1(file)
