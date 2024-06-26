import { expect, test, describe } from 'vitest'

import checkSecondary from '../checkSecondaryDiagonal'
import createGrid from '../createGrid'

import { X } from '@/constants'

const lookingFor = X
const startRowIdx = 0
const startColIdx = 0
const target = 3

describe('checkSecondary', () => {
  test('should check a secondary with false result', () => {
    const emptyGridOptions = {
      N: 4,
      winIndex: 0,
      start: 0,
      end: 3,
      mode: '',
      hasWinningMarks: false
    }
    const grid = createGrid(emptyGridOptions)
    const result = checkSecondary({ grid, startRowIdx, startColIdx, lookingFor, target })

    expect(result).toEqual({
      winner: '',
      won: false
    })
  })

  test('should check secondary with false as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 1,
      mode: 'secondary',
      hasWinningMarks: false
    }
    const grid = createGrid(gridOptions)

    const result = checkSecondary({
      grid,
      startRowIdx,
      startColIdx,
      lookingFor,
      target,
      shouldMarkWinningCells: true
    })

    expect(result).toEqual({
      winner: '',
      won: false
    })
  })

  test('should check secondary with true as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 2,
      mode: 'secondary',
      hasWinningMarks: false
    }
    const grid = createGrid(gridOptions)

    const result = checkSecondary({
      grid,
      startRowIdx,
      startColIdx: gridOptions.N - 1,
      lookingFor,
      target,
      shouldMarkWinningCells: true
    })

    expect(result).toEqual({
      winner: X,
      won: true
    })

    gridOptions.hasWinningMarks = true
    expect(grid).toEqual(createGrid(gridOptions))
  })

  test('should check secondary with true as winning result in a subrange', () => {
    const gridOptions = {
      N: 4,
      winIndex: 0,
      start: 1,
      end: 3,
      mode: 'secondary',
      hasWinningMarks: false
    }
    const grid = createGrid(gridOptions)

    const result = checkSecondary({
      grid,
      startRowIdx: 1,
      startColIdx: 2,
      lookingFor,
      target,
      shouldMarkWinningCells: true
    })

    expect(result).toEqual({
      winner: X,
      won: true
    })

    gridOptions.hasWinningMarks = true
    expect(grid).toEqual(createGrid(gridOptions))
  })
})
