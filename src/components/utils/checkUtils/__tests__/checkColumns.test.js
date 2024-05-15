import { expect, test, describe } from 'vitest'
import createInitialGrid from '../utils'
import checkColumns from '../checkColumns'
import { X } from '@/constants'

const lookingFor = X
const startRowIdx = 0
const startColIdx = 0
const target = 3

describe('checkColumn', () => {
  test('should check a column with false result', () => {
    const emptyGridOptions = {
      N: 4,
      winIndex: 0,
      start: 0,
      end: 3,
      mode: '',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(emptyGridOptions)
    const result = checkColumns({ grid, startRowIdx, startColIdx, lookingFor, target })

    expect(result).toEqual({
      winner: '',
      won: false
    })
  })

  test('should check first column with false as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 1,
      mode: 'col',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(gridOptions)

    const result = checkColumns({
      grid,
      startRowIdx,
      startColIdx,
      lookingFor,
      target,
      shouldMarkWinningCells: false
    })

    expect(result).toEqual({
      winner: '',
      won: false
    })
  })

  test('should check first column with true as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 2,
      mode: 'col',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(gridOptions)

    const result = checkColumns({
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

  test('should check second column with true as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 1,
      start: 0,
      end: 2,
      mode: 'col',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(gridOptions)

    const result = checkColumns({
      grid,
      startRowIdx,
      startColIdx: gridOptions.winIndex,
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

  test('should check third column with true as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 2,
      start: 0,
      end: 2,
      mode: 'col',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(gridOptions)

    const result = checkColumns({
      grid,
      startRowIdx,
      startColIdx: gridOptions.winIndex,
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

  test('should check first column with true as winning result in a subrange', () => {
    const gridOptions = {
      N: 4,
      winIndex: 0,
      start: 1,
      end: 3,
      mode: 'col',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(gridOptions)

    const result = checkColumns({
      grid,
      startRowIdx,
      startColIdx: gridOptions.winIndex,
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
