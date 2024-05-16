import type { gridT } from '@/components/types'
import { initialCellValue } from '@/constants'

const createEmptyGrid = (N: number): gridT => {
  return Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [initialCellValue, initialCellValue])
  )
}

export default createEmptyGrid
