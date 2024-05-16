import { X, W } from '@/constants'
import type { gridT, rowT } from '@/components/types'

interface createGridI {
  N: number
  winIndex: number
  start: number
  end: number
  mode: string
  hasWinningMarks: boolean
  lookingFor?: string
  emptyString?: string
}
/**
 * It will create a 2D array with marks and symbols in various subranges that represents
 * user's selection. This utility function is used by testing to check winning  results
 * */
const createGrid = ({
  N,
  winIndex,
  start,
  end,
  mode,
  hasWinningMarks,
  lookingFor = X,
  emptyString = ''
}: createGridI): gridT => {
  const grid: gridT = []

  for (let i = 0; i < N; i++) {
    const row: rowT = []

    for (let j = 0; j < N; j++) {
      let isWinningCell = false

      switch (mode) {
        case 'col':
          isWinningCell = j === winIndex && i >= start && i <= end
          break
        case 'row':
          isWinningCell = i === winIndex && j >= start && j <= end
          break
        case 'primary':
          isWinningCell = i === j && i >= start && i <= end
          break
        case 'secondary':
          isWinningCell = i + j === N - 1 && i >= start && i <= end
          break
      }

      const cellValue = isWinningCell ? lookingFor : emptyString
      const markValue = isWinningCell && hasWinningMarks ? W : emptyString

      row.push([cellValue, markValue])
    }

    grid.push(row)
  }

  return grid
}
export default createGrid
