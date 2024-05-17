import { minimax } from './minimax'

import type { gridT } from '@/components/types'
import { O, X, initialCellValue } from '@/constants'

interface findBestMoveI {
  gridCopy: gridT
  isXTurn: boolean
  M: number
  isMaximizing?: boolean
}
interface getBestScoreAndMoveI extends Omit<findBestMoveI, 'gridCopy'> {
  grid: gridT
  depth: number
  player: string
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

  for (const { i, j } of moves) {
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
