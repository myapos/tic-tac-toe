import { checkWinningCombinations } from './checkWinningCombinations'
import type { moveI } from './findBestMove'
import findEmptyCells from './findEmptyCells'

import type { gridT } from '@/components/types'
import { initialCellValue } from '@/constants'

interface lookAheadMovesI {
  grid: gridT
  player: string
  M: number
  isXTurn: boolean
}
/**
 * It will fill all empty cells with the player value
 * if there are more than one winning combinations
 * then prioritize that move
 **/
const lookAheadMoves = ({ grid, player, M, isXTurn }: lookAheadMovesI): moveI => {
  const moves = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j][0] === initialCellValue) {
        moves.push({ i, j })
      }
    }
  }

  let promisingMove = {
    i: -1,
    j: -1
  }

  const emptyCells = findEmptyCells(grid)
  const isAlmostEmptyGrid = emptyCells > Math.floor((grid.length * grid[0].length) / 2)

  if (isAlmostEmptyGrid) {
    return promisingMove
  }

  for (const { i, j } of moves) {
    grid[i][j][0] = player
    const winningCombinations = checkWinningCombinations(grid, i, j, M, isXTurn, false)
    if (winningCombinations > 1) {
      promisingMove = {
        i,
        j
      }
      break
    }
  }

  return promisingMove
}

export default lookAheadMoves
