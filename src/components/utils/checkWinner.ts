// gameLogic.ts
import checkColumns from './checkUtils/checkColumns'
import checkPrimaryDiagonal from './checkUtils/checkPrimaryDiagonal'
import checkRow from './checkUtils/checkRow'
import checkSecondaryDiagonal from './checkUtils/checkSecondaryDiagonal'
import isDraw from './checkUtils/isDraw'

import type { gridT } from '@/components/types.ts'
import { O, X } from '@/constants'

export interface checkWinnerI {
  feedback: string
  winner: string
  won: boolean
}
export const checkWinner = (
  grid: gridT,
  rowIdx: number,
  colIdx: number,
  M: number,
  isXTurn: boolean,
  shouldMarkWinningCells: boolean
): checkWinnerI => {
  const lookingFor = isXTurn ? X : O

  const rowResult = checkRow({
    grid,
    startRowIdx: rowIdx,
    startColIdx: colIdx,
    lookingFor,
    target: M,
    shouldMarkWinningCells
  })

  if (rowResult.won) {
    return {
      feedback: `Player ${rowResult.winner} wins!`,
      winner: rowResult.winner,
      won: rowResult.won
    }
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
    return {
      feedback: `Player ${colResult.winner} wins!`,
      winner: colResult.winner,
      won: colResult.won
    }
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
    return {
      feedback: `Player ${primaryDiagonalResult.winner} wins!`,
      winner: primaryDiagonalResult.winner,
      won: primaryDiagonalResult.won
    }
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
    return {
      feedback: `Player ${secondaryDiagonalResult.winner} wins!`,
      winner: secondaryDiagonalResult.winner,
      won: secondaryDiagonalResult.won
    }
  }

  return {
    feedback: '',
    winner: '',
    won: false
  }
}

export const checkDraw = (grid: gridT, counter: number): boolean => {
  return isDraw({ grid, counter })
}
