import { checkWinner } from './checkWinner'
import type { moveI } from './findEmptyMoves'
import findEmptyMoves from './findEmptyMoves'

import type { gridT } from '@/components/types'
import { initialCellValue, X, O } from '@/constants'

interface checkInstantMovesI {
  grid: gridT
  isXTurn: boolean
  M: number
}

const checkInstantMoves = ({ grid, M, isXTurn }: checkInstantMovesI): moveI => {
  const player = isXTurn ? X : O
  const moves = findEmptyMoves(grid)

  let result
  // initialize to negative i,j values
  let instantMove = { i: -1, j: -1 }
  for (const { i, j } of moves) {
    if (grid[i][j][0] === initialCellValue) {
      // set
      grid[i][j][0] = player
      result = checkWinner(grid, i, j, M, isXTurn, false)
      // reset
      grid[i][j][0] = initialCellValue
      if (result.won) {
        instantMove = { i, j }
        break
      }
    }
  }

  return instantMove
}

export default checkInstantMoves
