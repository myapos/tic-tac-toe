import type { checkI } from './types'
import { W } from '@/constants'

const checkSecondaryDiagonal = ({ grid, startRowIdx, startColIdx, lookingFor, target }: checkI) => {
  let i = startRowIdx,
    j = startColIdx
  let countValuesUp = 0
  let countValuesDown = 0

  //search up
  while (i >= 0 && j < grid.length && grid[i][j][0] === lookingFor) {
    countValuesUp++
    i--
    j++
  }

  if (countValuesUp === target) {
    for (let c = 0; c < target; c++) {
      grid[startRowIdx - c][startColIdx + c][1] = W
    }

    // winner
    return {
      winner: lookingFor,
      won: true
    }
  }

  // reset starting positions
  ;(i = startRowIdx + 1), (j = startColIdx - 1)

  //search down from the next cell in secondary diagonal
  while (i < grid.length && j >= 0 && grid[i][j][0] === lookingFor) {
    countValuesDown++
    i++
    j--
  }

  if (countValuesUp + countValuesDown === target) {
    for (let c = 0; c < target; c++) {
      const winCellRowIdx = startRowIdx - countValuesUp + c + 1
      const winCellColIdx = startColIdx + countValuesUp - c - 1

      grid[winCellRowIdx][winCellColIdx][1] = W
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

export default checkSecondaryDiagonal
