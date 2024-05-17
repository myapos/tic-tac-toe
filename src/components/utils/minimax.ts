import checkAiWinner from './checkAiWinner'
import isDraw from './checkUtils/isDraw'
import { getBestScoreAndMove } from './findBestMove'
import findEmptyCells from './findEmptyCells'
import { getMaxDepth } from './getMaxDepth'

import type { gridT } from '@/components/types'
import { O, X } from '@/constants'

interface minimaxI {
  grid: gridT
  depth: number
  M: number
  isXTurn: boolean
  isMaximizing: boolean
  alpha: number
  beta: number
}
const memo = new Map<string, number>()

const getBoardKey = (grid: gridT, depth: number) => {
  return `${grid.flat().join('')}_${depth}`
}

export const minimax = ({ grid, depth, isMaximizing, M, isXTurn, alpha, beta }: minimaxI) => {
  const boardKey = getBoardKey(grid, depth)
  if (memo.has(boardKey)) {
    return memo.get(boardKey)!
  }

  const result = checkAiWinner({ grid, shouldMarkWinningCells: false, M, isXTurn: isMaximizing })
  // Check draw as last step if no one wins
  if (isDraw({ grid })) {
    return 0
  }

  if (result.won || depth >= getMaxDepth({ grid })) {
    const emptyCells = findEmptyCells(grid)
    const score = isMaximizing ? 1 * (emptyCells + 1) : -1 * (emptyCells + 1)
    memo.set(boardKey, score)
    return score
  }

  if (isMaximizing) {
    const { bestScore } = getBestScoreAndMove({
      grid,
      depth,
      isXTurn,
      M,
      player: X,
      isMaximizing,
      alpha,
      beta
    })
    memo.set(boardKey, bestScore)
    return bestScore
  }

  const { bestScore } = getBestScoreAndMove({
    grid,
    depth,
    isXTurn,

    M,
    player: O,
    isMaximizing,
    alpha,
    beta
  })
  memo.set(boardKey, bestScore)
  return bestScore
}
