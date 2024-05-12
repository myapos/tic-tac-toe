// gameLogic.ts
import { O, X } from '@/constants'
import type { gridT } from '@/components/types.ts'
import checkRow from './checkUtils/checkRow'
import checkColumns from './checkUtils/checkColumns'
import checkPrimaryDiagonal from './checkUtils/checkPrimaryDiagonal'
import checkSecondaryDiagonal from './checkUtils/checkSecondaryDiagonal'
import isDraw from './checkUtils/isDraw'

export const checkWinner = (
  grid: gridT,
  rowIdx: number,
  colIdx: number,
  M: number,
  isXTurn: boolean
): string => {
  const lookingFor = isXTurn ? X : O

  const rowResult = checkRow({
    grid,
    startRowIdx: rowIdx,
    startColIdx: colIdx,
    lookingFor,
    target: M
  })

  if (rowResult.won) {
    return `Player ${rowResult.winner} wins!`
  }

  const colResult = checkColumns({
    grid,
    startRowIdx: rowIdx,
    startColIdx: colIdx,
    lookingFor,
    target: M
  })

  if (colResult.won) {
    return `Player ${colResult.winner} wins!`
  }

  const primaryDiagonalResult = checkPrimaryDiagonal({
    grid,
    startRowIdx: rowIdx,
    startColIdx: colIdx,
    lookingFor,
    target: M
  })

  if (primaryDiagonalResult.won) {
    return `Player ${primaryDiagonalResult.winner} wins!`
  }

  const secondaryDiagonalResult = checkSecondaryDiagonal({
    grid,
    startRowIdx: rowIdx,
    startColIdx: colIdx,
    lookingFor,
    target: M
  })

  if (secondaryDiagonalResult.won) {
    return `Player ${secondaryDiagonalResult.winner} wins!`
  }

  return ''
}

export const checkDraw = (grid: gridT, counter: number): boolean => {
  return isDraw({ grid, counter })
}
