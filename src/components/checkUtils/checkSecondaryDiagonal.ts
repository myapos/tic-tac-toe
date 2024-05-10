import type { checkI } from './types'

const checkSecondaryDiagonal = ({ grid, startRowIdx, startColIdx, lookingFor, target }: checkI) => {
  let i = startRowIdx,
    j = startColIdx
  let countValues = 0

  //search up
  while (i >= 0 && j < grid.length && grid[i][j] === lookingFor) {
    countValues++
    i--
    j++
  }

  if (countValues === target) {
    // winner
    return {
      winner: lookingFor,
      won: true
    }
  }

  // reset starting positions
  ;(i = startRowIdx + 1), (j = startColIdx - 1)

  //search down from the next cell in secondary diagonal
  while (i < grid.length && j < grid.length && grid[i][j] === lookingFor) {
    countValues++
    i++
    j--
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

export default checkSecondaryDiagonal
