export type gridT = Array<Array<string>>

export interface checkI {
  grid: gridT
  startRowIdx: number
  startColIdx: number
  lookingFor: string
  target: number
}
