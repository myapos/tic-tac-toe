import type { checkI } from './types'
import { W } from '@/constants'

const checkRow = ({ grid, startRowIdx, startColIdx, lookingFor, target }: checkI) => {
  let i = startRowIdx,
    j = startColIdx
  let countValuesLeft = 0
  let countValuesRight = 0

  //search left
  while (j >= 0 && grid[i][j][0] === lookingFor) {
    countValuesLeft++
    j--
  }

  if (countValuesLeft === target) {
    // mark winning cells with special value
    for (let c = startColIdx; c >= startColIdx - target + 1; c--) {
      grid[i][c][1] = W
    }
    // winner
    return {
      winner: lookingFor,
      won: true
    }
  }

  // reset starting positions from the next column
  ;(i = startRowIdx), (j = startColIdx + 1)

  //search right
  while (j < grid.length && grid[i][j][0] === lookingFor) {
    countValuesRight++
    j++
  }

  if (countValuesLeft + countValuesRight === target) {
    for (
      let c = startColIdx - (countValuesLeft - 1);
      c <= startColIdx + target - countValuesLeft;
      c++
    ) {
      grid[i][c][1] = W
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

export default checkRow
