import type { gridT } from '../types'

export interface checkI {
  grid: gridT
  startRowIdx: number
  startColIdx: number
  lookingFor: string
  target: number
}
