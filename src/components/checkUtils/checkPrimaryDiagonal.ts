import type { checkI } from './types'

const checkPrimaryDiagonal = ({ grid, startRowIdx, startColIdx, lookingFor, target }: checkI) => {
  let i = startRowIdx,
    j = startColIdx
  let countValues = 0

  //search up
  while (i >= 0 && j >= 0 && grid[i][j] === lookingFor) {
    countValues++
    i--
    j--
  }

  if (countValues === target) {
    // winner
    return {
      winner: lookingFor,
      won: true
    }
  }

  // reset starting positions from the next cell in primary diagonal
  ;(i = startRowIdx + 1), (j = startColIdx + 1)

  //search down
  while (i < grid.length && j < grid.length && grid[i][j] === lookingFor) {
    countValues++
    i++
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

export default checkPrimaryDiagonal
