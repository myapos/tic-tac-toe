import type { Ref } from 'vue'

import { checkWinner } from './checkWinner'

import type { rowT, cellT } from '@/components/types'

interface checkAiWinnerI {
  grid: any
  shouldMarkWinningCells: boolean
  isXTurn: boolean
  M: number
}

interface checkAiWinnerResultI {
  feedback: string
  winner: string
  won: boolean
}

const checkAiWinner = ({
  grid,
  shouldMarkWinningCells,
  isXTurn,
  M
}: checkAiWinnerI): checkAiWinnerResultI => {
  let result: checkAiWinnerResultI = {
    feedback: '',
    winner: '',
    won: false
  }
  grid.some((row: rowT, i: number) => {
    return row.some((cell: cellT, j: number) => {
      result = checkWinner(grid, i, j, M, isXTurn, shouldMarkWinningCells)
      return result.won
    })
  })

  return result
}

export default checkAiWinner
