import checkAiWinner from './checkAiWinner'
import isDraw from './checkUtils/isDraw'
import { getBestScoreAndMove } from './findBestMove'
import findEmptyCells from './findEmptyCells'
import { getMaxDepth } from './getMaxDepth'

import type { gridT } from '@/components/types'
import { O, X } from '@/constants'

interface negamaxI {
  grid: gridT
  depth: number
  M: number
  isXTurn: boolean
  alpha: number
  beta: number
  activeAlgorithm: any
}
const memo = new Map<string, number>()

const getBoardKey = (grid: gridT, depth: number) => {
  return `${JSON.stringify(grid)}_${depth}`
}

export const negamax = ({ grid, depth, M, isXTurn, alpha, beta, activeAlgorithm }: negamaxI) => {
  const boardKey = getBoardKey(grid, depth)
  if (memo.has(boardKey)) {
    return memo.get(boardKey)!
  }

  const result = checkAiWinner({ grid, shouldMarkWinningCells: false, M, isXTurn })
  // Check draw as last step if no one wins
  if (isDraw({ grid })) {
    return 0
  }

  if (result.won || depth >= getMaxDepth({ grid })) {
    const emptyCells = findEmptyCells(grid)
    const score = emptyCells + 1
    memo.set(boardKey, score)
    return score
  }

  const { bestScore } = getBestScoreAndMove({
    grid,
    depth,
    isXTurn,
    M,
    player: isXTurn ? X : O,
    alpha,
    beta,
    activeAlgorithm
  })
  memo.set(boardKey, bestScore)
  return bestScore
}
