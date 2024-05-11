import type { checkI } from './types'

const checkPrimaryDiagonal = ({ grid, startRowIdx, startColIdx, lookingFor, target }: checkI) => {
  let i = startRowIdx,
    j = startColIdx
  let countValuesUp = 0
  let countValuesDown = 0

  //search up
  while (i >= 0 && j >= 0 && grid[i][j] === lookingFor) {
    countValuesUp++
    i--
    j--
  }

  if (countValuesUp === target) {
    for (let c = 0; c < target; c++) {
      grid[startRowIdx - c][startColIdx - c] = `${lookingFor} - W`
    }
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
    countValuesDown++
    i++
    j++
  }

  if (countValuesUp + countValuesDown === target) {
    for (let c = 0; c < target; c++) {
      const winCellRowIdx = startRowIdx - countValuesUp + c + 1
      const winCellColIdx = startColIdx - countValuesUp + c + 1

      grid[winCellRowIdx][winCellColIdx] = `${lookingFor} - W`
    }
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
