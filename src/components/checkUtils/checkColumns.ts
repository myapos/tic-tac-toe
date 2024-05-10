import type { checkI } from './types'

const checkColumns = ({ grid, startRowIdx, startColIdx, lookingFor, target }: checkI) => {
  let i = startRowIdx,
    j = startColIdx
  let countValues = 0

  //search up
  while (i >= 0 && grid[i][j] === lookingFor) {
    countValues++
    i--
  }

  if (countValues === target) {
    // winner
    return {
      winner: lookingFor,
      won: true
    }
  }

  // reset starting positions
  ;(i = startRowIdx + 1), (j = startColIdx)

  //search down from the next row
  while (i < grid.length && grid[i][j] === lookingFor) {
    countValues++
    i++
  }

  if (countValues === target) {
    // winner
    return {
      winner: lookingFor,
      won: true
    }
  }

  return {
    winner: '',
    won: false
  }
}

export default checkColumns
