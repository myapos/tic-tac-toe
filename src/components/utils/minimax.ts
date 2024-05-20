import checkAiWinner from './checkAiWinner'
import isDraw from './checkUtils/isDraw'
import { getBestScoreAndMove } from './findBestMove'
import findEmptyCells from './findEmptyCells'
import getBoardKey from './getBoardKey'
import { getMaxDepth } from './getMaxDepth'

import type { gridT } from '@/components/types'
import { O, X } from '@/constants'
import { useGameStore } from '@/stores/gameStore'

interface minimaxI {
  grid: gridT
  depth: number
  M: number
  isXTurn: boolean
  isMaximizing: boolean
  alpha: number
  beta: number
  activeAlgorithm: any
}

export const minimax = ({
  grid,
  depth,
  isMaximizing,
  M,
  isXTurn,
  alpha,
  beta,
  activeAlgorithm
}: minimaxI): number => {
  const gameStore = useGameStore()

  const boardKey = getBoardKey(grid, depth)
  if (gameStore.memo.has(boardKey)) {
    return gameStore.memo.get(boardKey)!
  }

  const result = checkAiWinner({ grid, shouldMarkWinningCells: false, M, isXTurn: isMaximizing })
  // Check draw as last step if no one wins
  if (isDraw({ grid })) {
    return 0
  }

  if (result.won || depth >= getMaxDepth({ grid })) {
    const emptyCells = findEmptyCells(grid)
    const score = isMaximizing ? 1 * (emptyCells + 1) : -1 * (emptyCells + 1)
    gameStore.memo.set(boardKey, score)
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
      beta,
      activeAlgorithm
    })
    gameStore.memo.set(boardKey, bestScore)
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
    beta,
    activeAlgorithm
  })
  gameStore.memo.set(boardKey, bestScore)
  return bestScore
}
