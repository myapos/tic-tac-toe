import { W } from '@/constants'
import type { checkI } from './types'

const markWinningCellsLeft = (
  startRowIdx: checkI['startRowIdx'],
  startColIdx: checkI['startColIdx'],
  target: number,
  grid: checkI['grid']
): void => {
  for (let c = startColIdx; c >= startColIdx - target + 1; c--) {
    grid[startRowIdx][c][1] = W
  }
}

const markWinningCellsRight = (
  startRowIdx: checkI['startRowIdx'],
  startColIdx: checkI['startColIdx'],
  target: number,
  countValuesLeft: number,
  grid: checkI['grid']
) => {
  for (
    let c = startColIdx - (countValuesLeft - 1);
    c <= startColIdx + target - countValuesLeft;
    c++
  ) {
    grid[startRowIdx][c][1] = W
  }
}

const checkRow = ({ grid, startRowIdx, startColIdx, lookingFor, target }: checkI) => {
  let i = startRowIdx,
    j = startColIdx
  let countValuesLeft = 0
  let countValuesRight = 0

  // Search left
  while (j >= 0 && grid[i][j][0] === lookingFor) {
    countValuesLeft++
    j--
  }

  if (countValuesLeft === target) {
    markWinningCellsLeft(startRowIdx, startColIdx, target, grid)
    return { winner: lookingFor, won: true }
  }

  // Reset starting positions from the next column
  ;(i = startRowIdx), (j = startColIdx + 1)

  // Search right
  while (j < grid[i].length && grid[i][j][0] === lookingFor) {
    countValuesRight++
    j++
  }

  if (countValuesLeft + countValuesRight === target) {
    markWinningCellsRight(startRowIdx, startColIdx, target, countValuesLeft, grid)
    return { winner: lookingFor, won: true }
  }

  return { winner: '', won: false }
}

export default checkRow
