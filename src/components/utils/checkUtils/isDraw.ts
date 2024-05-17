import type { gridT } from '@/components/types.ts'
import findEmptyCells from '@/components/utils/findEmptyCells'

const isDraw = ({ grid }: { grid: gridT }) => {
  const emptyCells = findEmptyCells(grid)

  console.log('emptyCells', emptyCells)

  return emptyCells === 0
}

export default isDraw
