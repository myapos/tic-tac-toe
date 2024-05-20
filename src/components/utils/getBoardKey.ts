import type { gridT } from '@/components/types'

const getBoardKey = (grid: gridT, depth: number) => {
  return `${JSON.stringify(grid)}_${depth}`
}

export default getBoardKey
