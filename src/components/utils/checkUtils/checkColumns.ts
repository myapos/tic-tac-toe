import type { checkI } from './types'

import { W } from '@/constants'

const markWinningCellsUp = (
  startRowIdx: checkI['startRowIdx'],
  startColIdx: checkI['startColIdx'],
  target: number,
  grid: checkI['grid']
): void => {
  for (let c = 0; c < target; c++) {
    const winCellRowIdx = startRowIdx - c
    const winCellColIdx = 1
    grid[winCellRowIdx][startColIdx][winCellColIdx] = W
  }
}

const markWinningCellsDown = (
  startRowIdx: checkI['startRowIdx'],
  startColIdx: checkI['startColIdx'],
  target: number,
  countValuesUp: number,
  grid: checkI['grid']
) => {
  for (let c = 0; c < target; c++) {
    const winCellRowIdx = startRowIdx - countValuesUp + c + 1
    const winCellColIdx = 1

    grid[winCellRowIdx][startColIdx][winCellColIdx] = W
  }
}
const checkColumns = ({
  grid,
  startRowIdx,
  startColIdx,
  lookingFor,
  target,
  shouldMarkWinningCells = true
}: checkI) => {
  let currentRow = startRowIdx,
    currentColumn = startColIdx
  let countValuesUp = 0
  let countValuesDown = 0

  // Search up
  while (
    currentRow < grid.length &&
    currentRow >= 0 &&
    grid[currentRow][currentColumn][0] === lookingFor
  ) {
    countValuesUp++
    currentRow--
  }

  if (countValuesUp === target) {
    shouldMarkWinningCells && markWinningCellsUp(startRowIdx, startColIdx, target, grid)
    return { winner: lookingFor, won: true }
  }

  // Reset starting positions
  currentRow = startRowIdx + 1
  currentColumn = startColIdx

  // Search down from the next row
  while (
    currentRow < grid.length &&
    currentColumn < grid[0].length &&
    grid[currentRow][currentColumn][0] === lookingFor
  ) {
    countValuesDown++
    currentRow++
  }

  if (countValuesUp + countValuesDown === target) {
    shouldMarkWinningCells &&
      markWinningCellsDown(startRowIdx, startColIdx, target, countValuesUp, grid)
    return { winner: lookingFor, won: true }
  }

  return { winner: '', won: false }
}

export default checkColumns
