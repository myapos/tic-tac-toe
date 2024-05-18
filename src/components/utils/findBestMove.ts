import { minimax } from './minimax'
import { negamax } from './negamax'

import type { gridT } from '@/components/types'
import { O, X, initialCellValue, algorithms } from '@/constants'

interface findBestMoveI {
  gridCopy: gridT
  isXTurn: boolean
  M: number
  isMaximizing?: boolean
  activeAlgorithm: keyof typeof algorithms
}
interface getBestScoreAndMoveI extends Omit<findBestMoveI, 'gridCopy'> {
  grid: gridT
  depth: number
  player: string
  alpha: number
  beta: number
}

interface moveI {
  i: number
  j: number
}

interface getInitialBestScoreI {
  isMinimax: boolean
  isNegamax: boolean
  isMaximizing?: boolean
}
const getInitialBestScore = ({
  isMinimax,
  isNegamax,
  isMaximizing = false
}: getInitialBestScoreI): number => {
  if (isMinimax) {
    return isMaximizing ? -Infinity : Infinity
  }
  if (isNegamax) {
    return -Infinity
  }

  return -Infinity
}

export const getBestScoreAndMove = ({
  grid,
  depth,
  isXTurn,
  M,
  player,
  isMaximizing,
  alpha,
  beta,
  activeAlgorithm
}: getBestScoreAndMoveI): {
  move: moveI
  bestScore: number
} => {
  const isMinimax = activeAlgorithm === algorithms.MINIMAX
  const isNegamax = activeAlgorithm === algorithms.NEGAMAX

  let bestScore: number = getInitialBestScore({ isMinimax, isNegamax, isMaximizing })

  const moves = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j][0] === initialCellValue) {
        moves.push({ i, j })
      }
    }
  }

  // Sort moves to prioritize the most promising ones
  moves.sort((a, b) => {
    // Example heuristic: center and corners first
    const center = Math.floor(grid.length / 2)
    const aDistance = Math.abs(a.i - center) + Math.abs(a.j - center)
    const bDistance = Math.abs(b.i - center) + Math.abs(b.j - center)
    return aDistance - bDistance
  })

  let move: moveI = { i: 0, j: 0 }
  for (const { i, j } of moves) {
    grid[i][j][0] = player
    if (isMinimax) {
      const score = minimax({
        grid,
        depth: depth + 1,
        isMaximizing: !isMaximizing,
        M,
        isXTurn,
        alpha,
        beta,
        activeAlgorithm
      })

      grid[i][j][0] = initialCellValue

      if (isMaximizing && score > bestScore) {
        bestScore = score
        move = { i, j }
        alpha = Math.max(alpha, bestScore)
      } else if (!isMaximizing && score < bestScore) {
        bestScore = score
        move = { i, j }
        beta = Math.min(beta, bestScore)
      }

      if (beta <= alpha) {
        break
      }
    }

    if (isNegamax) {
      const score: number = -negamax({
        grid,
        depth: depth + 1,
        M,
        isXTurn: !isXTurn,
        alpha: -beta,
        beta: -alpha,
        activeAlgorithm
      })

      grid[i][j][0] = initialCellValue

      if (score > bestScore) {
        bestScore = score
        move = { i, j }
        alpha = Math.max(alpha, score)
      }
      if (alpha >= beta) {
        break
      }
    }
  }

  return { bestScore, move }
}

export const findBestMove = ({
  gridCopy,
  isXTurn,
  M,
  isMaximizing = false,
  activeAlgorithm
}: findBestMoveI): { i: number; j: number } | undefined => {
  const { move } = getBestScoreAndMove({
    grid: gridCopy,
    depth: 0,
    isXTurn,
    M,
    player: isXTurn ? X : O,
    isMaximizing,
    alpha: -Infinity,
    beta: Infinity,
    activeAlgorithm
  })
  return move
}
