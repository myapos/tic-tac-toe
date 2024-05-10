import type { checkI } from './types'

const checkRow = ({ grid, startRowIdx, startColIdx, lookingFor, target }: checkI) => {
  let i = startRowIdx,
    j = startColIdx
  let countValues = 0

  //search left
  while (j >= 0 && grid[i][j] === lookingFor) {
    countValues++
    j--
  }

  if (countValues === target) {
    // winner
    return {
      winner: lookingFor,
      won: true
    }
  }

  // reset starting positions
  ;(i = startRowIdx), (j = startColIdx), (countValues = 0)

  //search right
  while (j < grid.length && grid[i][j] === lookingFor) {
    countValues++
    j++
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

export default checkRow
