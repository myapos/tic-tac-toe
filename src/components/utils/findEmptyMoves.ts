import type { gridT } from '@/components/types'
import { initialCellValue } from '@/constants'

export interface moveI {
  i: number
  j: number
}

const findEmptyMoves = (grid: gridT): moveI[] => {
  const moves: moveI[] = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j][0] === initialCellValue) {
        moves.push({ i, j })
      }
    }
  }

  return moves
}

export default findEmptyMoves
