import { cloneDeep } from 'lodash'

import checkInstantMoves from './checkInstantMoves'
import type { moveI } from './findEmptyMoves'
import findEmptyMoves from './findEmptyMoves'
import lookAheadMoves from './lookAheadMoves'
import { minimax } from './minimax'
import { negamax } from './negamax'

import type { gridT } from '@/components/types'
import { difficultyLevels } from '@/constants'
import { O, X, initialCellValue, algorithms } from '@/constants'
import { useGameStore } from '@/stores/gameStore'

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

  const moves: moveI[] = findEmptyMoves(grid)

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

const checkSingleMoveWinning = ({
  gridCopy,
  isXTurn,
  M
}: {
  gridCopy: gridT
  isXTurn: boolean
  M: number
}) => {
  // check if the current player wins with a single move
  const singlePlayerMove = checkInstantMoves({
    grid: gridCopy,
    isXTurn,
    M
  })

  const shouldWinInstantly = singlePlayerMove.i >= 0 && singlePlayerMove.j >= 0

  if (shouldWinInstantly) {
    return singlePlayerMove
  }

  // check if the oponent will win with just one move and block it
  const opponentsMove = checkInstantMoves({
    grid: gridCopy,
    isXTurn: !isXTurn,
    M
  })

  const shouldDefend = opponentsMove.i >= 0 && opponentsMove.j >= 0

  if (shouldDefend) {
    return opponentsMove
  }

  return undefined
}
export const findBestMove = ({
  gridCopy,
  isXTurn,
  M,
  isMaximizing = false,
  activeAlgorithm
}: findBestMoveI): { i: number; j: number } | undefined => {
  const gameStore = useGameStore()
  if (gameStore.difficultyLevel === difficultyLevels.MEDIUM) {
    const singleMoveWin = checkSingleMoveWinning({ gridCopy, M, isXTurn })

    if (singleMoveWin) {
      return singleMoveWin
    }
  }

  if (gameStore.difficultyLevel === difficultyLevels.HARD) {
    const singleMoveWin = checkSingleMoveWinning({ gridCopy, M, isXTurn })

    if (singleMoveWin) {
      return singleMoveWin
    }

    // check look ahead move combinations
    const promisingMove = lookAheadMoves({
      grid: cloneDeep(gridCopy),
      player: !isXTurn ? X : O,
      M,
      isXTurn: !isXTurn
    })

    const shouldDefendPromising = promisingMove.i >= 0 && promisingMove.j >= 0

    if (shouldDefendPromising) {
      return promisingMove
    }
  }

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
