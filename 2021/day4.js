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

  const findFirst = (array) =>
    array.reduce((prev, curr) =>
      prev.highestIndex < curr.highestIndex ? prev : curr
    )
  const findLast = (array) =>
    array.reduce((prev, curr) =>
      prev.highestIndex > curr.highestIndex ? prev : curr
    )

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
    let winners = {
      boardID,
      winners: [],
      lowestIndexSum: '',
    }
    for (row of rows) {
      if (
        row.every((x) => numbers.includes(x))
        // || diag1.every((x) => numbers.includes(x)) ||
        // diag2.every((x) => numbers.includes(x)))
      ) {
        const numberIndexes = row.map((x) => numbers.indexOf(x))
        const sumofIndexes = numberIndexes.reduce((a, b) => a + b)
        const highestIndex = Math.max(...numberIndexes)
        winners.winners.push({
          boardID,
          numbers: row,
          numberIndexes,
          sumofIndexes,
          highestIndex,
          type: 'row',
        })
      }
    }
    for (col of cols) {
      if (col.every((x) => numbers.includes(x))) {
        const numberIndexes = col.map((x) => numbers.indexOf(x))
        const sumofIndexes = numberIndexes.reduce((a, b) => a + b)
        const highestIndex = Math.max(...numberIndexes)
        winners.winners.push({
          boardID,
          numbers: col,
          numberIndexes,
          sumofIndexes,
          highestIndex,
          type: 'col',
        })
      }
      // console.log(winners)
    }
    const first = findFirst(winners.winners)
    // console.log('winners', winners.winners)
    // console.log('first', first)
    return first
  }

  const searchBoards = (numbers, boards) => {
    let winners = []
    for (const [index, board] of boards.entries()) {
      winners.push(findBingo(numbers, board, index))
    }
    return winners
  }
  const winners = searchBoards(numbers, boards)
  // console.log(winners)

  const firstWinner = findFirst(winners)
  const lastWinner = findLast(winners)
  console.log('lastWinner', lastWinner)
  console.log('firstWinner', firstWinner)
  const firstWinnerBoard = boards[firstWinner.boardID]
  const lastWinnerBoard = boards[lastWinner.boardID]
  // console.log('firstWinner board', boards[firstWinner.boardID])

  const findFirstWinnerNumbers = (winner, winnerInfo) => {
    const winnerNrs = winner.flat()
    const wonAtCall = winnerInfo.highestIndex
    const numbersAtWin = numbers.slice(0, wonAtCall + 1)
    const winnerUncalledNrs = winnerNrs.filter((n) => !numbersAtWin.includes(n))
    const sumOfUncalledNrs = winnerUncalledNrs.reduce((a, b) => a + b)
    console.log('numbers', numbers, 'numbers called at win', numbersAtWin)
    console.log('winning boards nrs', winnerNrs)
    console.log('uncalled numbers', winnerUncalledNrs)
    console.log('sum of uncalled', sumOfUncalledNrs)
    const winningNumber = numbers[wonAtCall]
    console.log('winning nr', winningNumber)
    console.log('factor', sumOfUncalledNrs * winningNumber)
    // 80544, 71328 too high
  }
  findFirstWinnerNumbers(firstWinnerBoard, firstWinner)
  findFirstWinnerNumbers(lastWinnerBoard, lastWinner)
}

day4pt1(file)
