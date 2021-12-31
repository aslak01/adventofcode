import fs from 'fs'
const file = fs.readFileSync('./day6.txt', 'utf-8')
const day6pt1 = (file) => {
  const lines = file.trim()
  const fishes = lines.split(',').map((f) => parseInt(f))
  const days = 80

  const fishModel = (fish, days) => {
    let swarm = fish
    let newSwarm = []
    while (days > 0) {
      console.log(
        days,
        swarm.length,
        newSwarm.length,
        swarm.length + newSwarm.length
      )

      for (let i = 0; i < swarm.length; i++) {
        if (swarm[i] === 0) {
          newSwarm.push(8)
          swarm[i] = 6
        } else {
          swarm[i] = swarm[i] - 1
        }
      }
      swarm = [...swarm, ...newSwarm]
      newSwarm = []
      days = days - 1
    }
    return swarm
  }
  const fish = fishModel(fishes, days)
  console.log('results:', fish, fish.length)
}

// turns out day 1 method breaks down due to too long arrays

// day6pt1(file)

function day6pt2(file) {
  const lines = file.trim()
  const fish = lines.split(',').map((f) => parseInt(f))
  const days = 256
  const fishModel = (fishes, days) => {
    // create bucket array
    const buckets = new Array(9).fill(0)
    // fill with fishes according to value
    fishes.forEach((fish) => {
      buckets[fish]++
    })
    for (let i = 0; i < days; i++) {
      // remove 0s from buckets, moving all the others left
      const b = buckets.shift()

      // add the removed 0s as 6s
      buckets[6] += b

      // add the removed 0s as 8s
      buckets.push(b)
    }
    let total = 0
    buckets.forEach((b) => {
      total += b
    })
    return total
  }
  const result = fishModel(fish, days)
  console.log('results:', result)
}
day6pt2(file)
