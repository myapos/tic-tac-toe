import type { Ref } from 'vue'
import type { gridT } from '@/components/types'
import { O, initialCellValue } from '@/constants'
import { minimax } from './minimax'

interface findBestMoveI {
  gridCopy: gridT
  isXTurn: Ref<boolean>
  counter: Ref<number>
  setCounter: (value: number) => void
  M: number
}
interface getBestScoreAndMoveI {
  grid: gridT
  isXTurn: Ref<boolean>
  counter: Ref<number>
  setCounter: (value: number) => void
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
  setCounter,
  counter,
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
        setCounter(counter.value + 1)
        grid[i][j][0] = player
        const score = minimax({
          grid,
          depth: depth + 1,
          isMaximizing: !isMaximizing,
          counter,
          setCounter,
          M,
          isXTurn,
          alpha,
          beta
        })
        grid[i][j][0] = initialCellValue
        setCounter(counter.value - 1)

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
  setCounter,
  counter,
  M
}: findBestMoveI): { i: number; j: number } | undefined => {
  const { move } = getBestScoreAndMove({
    grid: gridCopy,
    depth: 0,
    isXTurn,
    setCounter,
    counter,
    M,
    player: O,
    isMaximizing: false,
    alpha: -Infinity,
    beta: Infinity
  })
  return move
}
