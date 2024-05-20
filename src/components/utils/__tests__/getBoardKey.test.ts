import { expect, test, describe } from 'vitest'

import createGrid from '../checkUtils/createGrid'
import createEmptyGrid from '../createEmptyGrid'
import getBoardKey from '../getBoardKey'

describe('getBoardKey', () => {
  test('should return boardKey on empty 3X3 grid and zero depth', () => {
    const grid = createEmptyGrid(3)

    const boardKey = getBoardKey(grid, 0)
    expect(boardKey).toEqual(
      '[[["",""],["",""],["",""]],[["",""],["",""],["",""]],[["",""],["",""],["",""]]]_0'
    )
  })
  test('should return boardKey on 3X3 winning grid and 2 depth', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 2,
      mode: 'primary',
      hasWinningMarks: false
    }

    const grid = createGrid(gridOptions)

    const boardKey = getBoardKey(grid, 2)
    expect(boardKey).toEqual(
      '[[["X",""],["",""],["",""]],[["",""],["X",""],["",""]],[["",""],["",""],["X",""]]]_2'
    )
  })
  test('should return boardKey on 3X3 loosing grid and 2 depth', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 1,
      mode: 'primary',
      hasWinningMarks: false
    }

    const grid = createGrid(gridOptions)

    const boardKey = getBoardKey(grid, 2)
    expect(boardKey).toEqual(
      '[[["X",""],["",""],["",""]],[["",""],["X",""],["",""]],[["",""],["",""],["",""]]]_2'
    )
  })
})
