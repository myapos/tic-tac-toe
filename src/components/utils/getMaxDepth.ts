import type { gridT } from '@/components/types'
import { DEFAULT_GRID_LENGTH } from '@/constants'

export const getMaxDepth = ({ grid }: { grid: gridT }): number => {
  if (grid.length <= DEFAULT_GRID_LENGTH) return 20

  return 4
}
