import type { gridT } from '@/components/types'
import { DEFAULT_GRID_LENGTH, MAX_DEPTH } from '@/constants'

export const getMaxDepth = ({ grid }: { grid: gridT }): number => {
  if (grid.length <= DEFAULT_GRID_LENGTH) return MAX_DEPTH

  return 4
}
