import type { Ref } from 'vue'

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
  isXTurn: Ref<boolean>
  isMaximizing: boolean
  counter: Ref<number>
  setCounter: (value: number) => void
  alpha: number
  beta: number
}
export const minimax = ({
  grid,
  depth,
  isMaximizing,
  counter,
  setCounter,
  M,
  isXTurn,
  alpha,
  beta
}: minimaxI) => {
  const result = checkAiWinner({ grid, shouldMarkWinningCells: false, M, isXTurn })
  // Check draw as last step if no one wins
  if (isDraw({ grid, counter: counter.value })) {
    return 0
  }

  if (result.won || depth >= getMaxDepth({ grid })) {
    const emptyCells = findEmptyCells(grid)
    return isMaximizing ? 1 * (emptyCells + 1) : -1 * (emptyCells + 1)
  }

  if (isMaximizing) {
    const { bestScore } = getBestScoreAndMove({
      grid,
      depth,
      isXTurn,
      setCounter,
      counter,
      M,
      player: X,
      isMaximizing,
      alpha,
      beta
    })
    return bestScore
  }

  const { bestScore } = getBestScoreAndMove({
    grid,
    depth,
    isXTurn,
    setCounter,
    counter,
    M,
    player: O,
    isMaximizing,
    alpha,
    beta
  })
  return bestScore
}
