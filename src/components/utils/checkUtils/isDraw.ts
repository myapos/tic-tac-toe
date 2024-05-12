import type { gridT } from '@/components/types.ts'

const isDraw = ({ grid, counter }: { grid: gridT; counter: number }) => {
  if (counter === grid.length * grid.length) {
    // all elements are set and no winner found so it is a draw
    return true
  }

  return false
}

export default isDraw
