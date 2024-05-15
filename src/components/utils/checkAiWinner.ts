import type { rowT, cellT } from '@/components/types'
import type { Ref } from 'vue'
import { checkWinner } from './checkWinner'

interface checkAiWinnerI {
  grid: any
  shouldMarkWinningCells: boolean
  isXTurn: Ref<boolean>
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
      result = checkWinner(grid, i, j, M, isXTurn.value, shouldMarkWinningCells)
      return result.won
    })
  })

  return result
}

export default checkAiWinner
