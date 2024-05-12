import { expect, test, describe } from 'vitest'
import createInitialGrid from '../utils'
import checkPrimary from '../checkPrimaryDiagonal'
import { X } from '@/constants'

const lookingFor = X
const startRowIdx = 0
const startColIdx = 0
const target = 3

describe('checkPrimary', () => {
  test('should check a primary with false result', () => {
    const emptyGridOptions = {
      N: 4,
      winIndex: 0,
      start: 0,
      end: 3,
      mode: '',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(emptyGridOptions)
    const result = checkPrimary({ grid, startRowIdx, startColIdx, lookingFor, target })

    expect(result).toEqual({
      winner: '',
      won: false
    })
  })

  test('should check primary with false as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 1,
      mode: 'primary',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(gridOptions)

    const result = checkPrimary({
      grid,
      startRowIdx,
      startColIdx,
      lookingFor,
      target
    })

    expect(result).toEqual({
      winner: '',
      won: false
    })
  })

  test('should check primary with true as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 2,
      mode: 'primary',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(gridOptions)

    const result = checkPrimary({
      grid,
      startRowIdx,
      startColIdx,
      lookingFor,
      target
    })

    expect(result).toEqual({
      winner: X,
      won: true
    })

    gridOptions.hasWinningMarks = true
    expect(grid).toEqual(createInitialGrid(gridOptions))
  })

  test('should check primary with true as winning result in a subrange', () => {
    const gridOptions = {
      N: 4,
      winIndex: 0,
      start: 1,
      end: 3,
      mode: 'primary',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(gridOptions)

    const result = checkPrimary({
      grid,
      startRowIdx: gridOptions.winIndex,
      startColIdx,
      lookingFor,
      target
    })

    expect(result).toEqual({
      winner: X,
      won: true
    })

    gridOptions.hasWinningMarks = true
    expect(grid).toEqual(createInitialGrid(gridOptions))
  })
})
