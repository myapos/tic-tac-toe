import type { checkI } from './types'
import { W } from '../../constants'

const checkColumns = ({ grid, startRowIdx, startColIdx, lookingFor, target }: checkI) => {
  let i = startRowIdx,
    j = startColIdx
  let countValuesUp = 0
  let countValuesDown = 0

  //search up
  while (i >= 0 && grid[i][j][0] === lookingFor) {
    countValuesUp++
    i--
  }

  if (countValuesUp === target) {
    for (let c = 0; c < target; c++) {
      grid[startRowIdx - c][startColIdx][1] = W
    }
    // winner
    return {
      winner: lookingFor,
      won: true
    }
  }

  // reset starting positions
  ;(i = startRowIdx + 1), (j = startColIdx)

  //search down from the next row
  while (i < grid.length && grid[i][j][0] === lookingFor) {
    countValuesDown++
    i++
  }

  if (countValuesUp + countValuesDown === target) {
    for (let c = 0; c < target; c++) {
      const winCellRowIdx = startRowIdx - countValuesUp + c + 1

      grid[winCellRowIdx][startColIdx][1] = W
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

export default checkColumns
