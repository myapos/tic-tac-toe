import type { Ref } from 'vue'

import { minimax } from './minimax'

import type { gridT } from '@/components/types'
import { O, X, initialCellValue } from '@/constants'

interface findBestMoveI {
  gridCopy: gridT
  isXTurn: Ref<boolean>
  M: number
  isMaximizing?: boolean
}
interface getBestScoreAndMoveI {
  grid: gridT
  isXTurn: Ref<boolean>
  M: number
  depth: number
  player: string
  isMaximizing: boolean
  alpha: number
  beta: number
}

export const getBestScoreAndMove = ({
  grid,
  depth,
  isXTurn,
  M,
  player,
  isMaximizing,
  alpha,
  beta
}: getBestScoreAndMoveI) => {
  let bestScore = isMaximizing ? -Infinity : Infinity
  let move
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const cellValue = grid[i][j][0]
      if (cellValue === initialCellValue) {
        // setCounter(counter.value + 1)
        grid[i][j][0] = player
        const score = minimax({
          grid,
          depth: depth + 1,
          isMaximizing: !isMaximizing,
          M,
          isXTurn,
          alpha,
          beta
        })
        grid[i][j][0] = initialCellValue
        // setCounter(counter.value - 1)

        if (!isMaximizing && score <= bestScore) {
          bestScore = score
          move = { i, j }
          beta = Math.max(beta, bestScore)
        }

        if (isMaximizing && score >= bestScore) {
          bestScore = score
          move = { i, j }
          alpha = Math.max(alpha, bestScore)
        }

        if (beta <= alpha) {
          break
        }
      }
    }

    if (beta <= alpha) {
      break
    }
  }

  return { bestScore, move }
}

export const findBestMove = ({
  gridCopy,
  isXTurn,
  M,
  isMaximizing = false
}: findBestMoveI): { i: number; j: number } | undefined => {
  const { move } = getBestScoreAndMove({
    grid: gridCopy,
    depth: 0,
    isXTurn,
    M,
    player: isMaximizing ? X : O,
    isMaximizing,
    alpha: -Infinity,
    beta: Infinity
  })
  return move
}
