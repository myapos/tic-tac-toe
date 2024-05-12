import type { checkI } from './types'
import { W } from '@/constants'

const markWinningCellsUp = (
  startRowIdx: checkI['startRowIdx'],
  startColIdx: checkI['startColIdx'],
  target: number,
  grid: checkI['grid']
): void => {
  for (let c = 0; c < target; c++) {
    grid[startRowIdx - c][startColIdx - c][1] = W
  }
}

const markWinningCellsDown = (
  startRowIdx: checkI['startRowIdx'],
  startColIdx: checkI['startColIdx'],
  target: number,
  countValuesUp: number,
  grid: checkI['grid']
): void => {
  for (let c = 0; c < target; c++) {
    const winCellRowIdx = startRowIdx - countValuesUp + c + 1
    const winCellColIdx = startColIdx - countValuesUp + c + 1
    grid[winCellRowIdx][winCellColIdx][1] = W
  }
}

const checkPrimaryDiagonal = ({ grid, startRowIdx, startColIdx, lookingFor, target }: checkI) => {
  let i = startRowIdx,
    j = startColIdx
  let countValuesUp = 0
  let countValuesDown = 0

  // Search up
  while (i >= 0 && j >= 0 && grid[i][j][0] === lookingFor) {
    countValuesUp++
    i--
    j--
  }

  if (countValuesUp === target) {
    markWinningCellsUp(startRowIdx, startColIdx, target, grid)
    return { winner: lookingFor, won: true }
  }

  // Reset starting positions from the next cell in primary diagonal
  ;(i = startRowIdx + 1), (j = startColIdx + 1)

  // Search down
  while (i < grid.length && j < grid.length && grid[i][j][0] === lookingFor) {
    countValuesDown++
    i++
    j++
  }

  if (countValuesUp + countValuesDown === target) {
    markWinningCellsDown(startRowIdx, startColIdx, target, countValuesUp, grid)
    return { winner: lookingFor, won: true }
  }

  return { winner: '', won: false }
}

export default checkPrimaryDiagonal
