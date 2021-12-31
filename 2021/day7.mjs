import fs from 'fs'
const file = fs.readFileSync('./day7.txt', 'utf-8')
const day7pt1 = (file) => {
  const lines = file.trim()
  const crabs = lines.split(',').map((f) => parseInt(f))
  const demoArr = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

  const findAvg = (arr) => {
    const sum = arr.reduce((a, b) => a + b, 0)
    return sum / arr.length
  }
  const findMedian = (arr) => {
    arr.sort((a, b) => a - b)
    return arr[Math.floor(arr.length / 2)]
  }
  const findMode = (arr) => {
    const counts = {}
    arr.forEach((a) => {
      counts[a] = counts[a] ? counts[a] + 1 : 1
    })
    const max = Math.max(...Object.values(counts))
    return parseInt(Object.keys(counts).filter((k) => counts[k] === max))
  }
  const findRange = (arr) => {
    const min = Math.min(...arr)
    const max = Math.max(...arr)
    return [min, max]
  }
  const findSpread = (arr) => {
    const [min, max] = findRange(arr)
    return max - min
  }
  const findStdDev = (arr) => {
    const avg = findAvg(arr)
    const sum = arr.reduce((a, b) => a + Math.pow(b - avg, 2), 0)
    return Math.sqrt(sum / arr.length)
  }

  const findModeAvgMedianSpread = (arr) => {
    const mode = findMode(arr)
    const avg = findAvg(arr)
    const median = findMedian(arr)
    const spread = findSpread(arr)
    const stdDev = findStdDev(arr)
    return { mode, avg, median, spread, stdDev }
  }

  const crabStats = { ...findModeAvgMedianSpread(crabs) }
  const testStats = { ...findModeAvgMedianSpread(demoArr) }

  console.log('crabStats:', crabStats, 'testStats:', testStats)

  const checkFuelCost = (arr, value) => {
    let fuel = arr.map((n) => {
      if (n === value) {
        return 0
      }
      if (n < value) {
        return value - n
      }
      if (n > value) {
        return n - value
      }
    })
    let total = 0
    fuel.forEach((n) => (total += n))
    return total
  }

  const crabFuelCheck = {
    mode: checkFuelCost(crabs, crabStats.mode),
    avg: checkFuelCost(crabs, crabStats.avg),
    median: checkFuelCost(crabs, crabStats.median),
    spread: checkFuelCost(crabs, crabStats.spread),
    stdDev: checkFuelCost(crabs, crabStats.stdDev),
  }
  console.log('day7 pt.1 (pick the lowest):', crabFuelCheck)

  const fuelAlgorithm = (n) => {
    let newValue = n
    for (let i = 1; i < n; i++) {
      newValue += i
    }
    return newValue
  }
  const checkFuelCostPt2 = (arr, value) => {
    let fuel = arr.map((n) => {
      if (n === value) {
        return 0
      }
      if (n < value) {
        return fuelAlgorithm(value - n)
      }
      if (n > value) {
        return fuelAlgorithm(n - value)
      }
    })
    let total = 0
    fuel.forEach((n) => (total += n))
    return total
  }
  const fuelCheck2 = {
    mode: checkFuelCostPt2(demoArr, testStats.mode),
    avg: checkFuelCostPt2(demoArr, Math.round(testStats.avg)),
    median: checkFuelCostPt2(demoArr, testStats.median),
    spread: checkFuelCostPt2(demoArr, testStats.spread),
    stdDev: checkFuelCostPt2(demoArr, testStats.stdDev),
  }
  console.log('demoData:', fuelCheck2)

  const crabFuelCheck2 = {
    mode: checkFuelCostPt2(crabs, crabStats.mode),
    avg: checkFuelCostPt2(crabs, Math.round(crabStats.avg)),
    median: checkFuelCostPt2(crabs, crabStats.median),
    spread: checkFuelCostPt2(crabs, crabStats.spread),
    stdDev: checkFuelCostPt2(crabs, Math.round(crabStats.stdDev)),
    roundedDownAvg: checkFuelCostPt2(crabs, Math.floor(crabStats.avg)),
  }
  console.log('crabs', crabFuelCheck2)
  // 104149135 too high
  // turns out the problem was some rounding issue with the avg, rounding down solved it
}

day7pt1(file)
