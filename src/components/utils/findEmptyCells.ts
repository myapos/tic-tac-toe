import type { gridT } from '@/components/types'
import { initialCellValue } from '@/constants'

function findEmptyCells(grid: gridT): number {
  return grid.reduce((totalEmptyCells, row) => {
    return (
      totalEmptyCells +
      row.reduce((emptyCellsInRow, cell) => {
        return emptyCellsInRow + (cell[0] === initialCellValue ? 1 : 0)
      }, 0)
    )
  }, 0)
}

export default findEmptyCells
