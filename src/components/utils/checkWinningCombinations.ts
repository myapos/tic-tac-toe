import checkColumns from './checkUtils/checkColumns'
import checkPrimaryDiagonal from './checkUtils/checkPrimaryDiagonal'
import checkRow from './checkUtils/checkRow'
import checkSecondaryDiagonal from './checkUtils/checkSecondaryDiagonal'

import type { gridT } from '@/components/types.ts'
import { O, X } from '@/constants'

export const checkWinningCombinations = (
  grid: gridT,
  rowIdx: number,
  colIdx: number,
  M: number,
  isXTurn: boolean,
  shouldMarkWinningCells: boolean
): number => {
  const lookingFor = isXTurn ? X : O
  let winningCombinations = 0

  const rowResult = checkRow({
    grid,
    startRowIdx: rowIdx,
    startColIdx: colIdx,
    lookingFor,
    target: M,
    shouldMarkWinningCells
  })

  if (rowResult.won) {
    winningCombinations++
  }

  const colResult = checkColumns({
    grid,
    startRowIdx: rowIdx,
    startColIdx: colIdx,
    lookingFor,
    target: M,
    shouldMarkWinningCells
  })

  if (colResult.won) {
    winningCombinations++
  }

  const primaryDiagonalResult = checkPrimaryDiagonal({
    grid,
    startRowIdx: rowIdx,
    startColIdx: colIdx,
    lookingFor,
    target: M,
    shouldMarkWinningCells
  })

  if (primaryDiagonalResult.won) {
    winningCombinations++
  }

  const secondaryDiagonalResult = checkSecondaryDiagonal({
    grid,
    startRowIdx: rowIdx,
    startColIdx: colIdx,
    lookingFor,
    target: M,
    shouldMarkWinningCells
  })

  if (secondaryDiagonalResult.won) {
    winningCombinations++
  }

  return winningCombinations
}
