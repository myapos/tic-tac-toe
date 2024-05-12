import type { gridT } from '@/components/types.ts'

export interface checkI {
  grid: gridT
  startRowIdx: number
  startColIdx: number
  lookingFor: string
  target: number
}
