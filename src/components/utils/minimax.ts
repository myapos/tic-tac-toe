import type { Ref } from 'vue'
import type { gridT } from '@/components/types'
import { O, X, MAX_DEPTH } from '@/constants'
import isDraw from './checkUtils/isDraw'
import checkAiWinner from './checkAiWinner'
import findEmptyCells from './findEmptyCells'
import { getBestScoreAndMove } from './findBestMove'

interface minimaxI {
  grid: gridT
  depth: number
  M: number
  isXTurn: Ref<boolean>
  isMaximizing: boolean
  counter: Ref<number>
  setCounter: (value: number) => void
}
export const minimax = ({
  grid,
  depth,
  isMaximizing,
  counter,
  setCounter,
  M,
  isXTurn
}: minimaxI) => {
  const result = checkAiWinner({ grid, shouldMarkWinningCells: false, M, isXTurn })
  // Check draw as last step if no one wins
  if (isDraw({ grid, counter: counter.value })) {
    return 0
  }

  if (result.won) {
    const emptyCells = findEmptyCells(grid)
    return isMaximizing ? 1 * (emptyCells + 1) : -1 * (emptyCells + 1)
  }

  if (depth === MAX_DEPTH) {
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
      isMaximizing
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
    isMaximizing
  })
  return bestScore
}
