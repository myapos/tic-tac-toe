import { expect, test, describe } from 'vitest'

import createGrid from '../checkUtils/createGrid'
import createEmptyGrid from '../createEmptyGrid'
import findEmptyCells from '../findEmptyCells'

describe('findEmptyCells', () => {
  test('should count empty cells on grid with first winning column', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 2,
      mode: 'col',
      hasWinningMarks: false
    }
    const grid = createGrid(gridOptions)

    const emptyCells = findEmptyCells(grid)
    expect(emptyCells).toEqual(6)
  })

  test('should count empty cells on empty grid', () => {
    const grid = createEmptyGrid(4)

    const emptyCells = findEmptyCells(grid)
    expect(emptyCells).toEqual(16)
  })
})
