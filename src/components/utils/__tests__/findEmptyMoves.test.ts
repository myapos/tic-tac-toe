import { expect, test, describe } from 'vitest'

import createGrid from '../checkUtils/createGrid'
import createEmptyGrid from '../createEmptyGrid'
import findEmptyMoves from '../findEmptyMoves'

describe('findEmptyMoves', () => {
  test('should find empty moves on grid with first winning column', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 2,
      mode: 'col',
      hasWinningMarks: false
    }

    const shouldHaveEmptyMoves = [
      {
        i: 0,
        j: 1
      },
      {
        i: 0,
        j: 2
      },
      {
        i: 1,
        j: 1
      },
      {
        i: 1,
        j: 2
      },
      {
        i: 2,
        j: 1
      },
      {
        i: 2,
        j: 2
      }
    ]
    const grid = createGrid(gridOptions)

    const emptyMoves = findEmptyMoves(grid)
    expect(emptyMoves).toEqual(shouldHaveEmptyMoves)
    expect(emptyMoves.length).toEqual(6)
  })

  test('should find empty moves on empty grid', () => {
    const grid = createEmptyGrid(4)

    const emptyMoves = findEmptyMoves(grid)
    expect(emptyMoves.length).toEqual(16)
  })
})
