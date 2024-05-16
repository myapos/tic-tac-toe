import { expect, test, describe } from 'vitest'
import { X } from '@/constants'

import createGrid from '../createGrid'
import checkRow from '../checkRow'

const lookingFor = X
const startRowIdx = 0
const startColIdx = 0
const target = 3

describe('checkRow', () => {
  test('should check a row with false result', () => {
    const emptyGridOptions = {
      N: 4,
      winIndex: 0,
      start: 0,
      end: 3,
      mode: '',
      hasWinningMarks: false
    }
    const grid = createGrid(emptyGridOptions)
    const result = checkRow({
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

  test('should check first row with false as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 1,
      mode: 'row',
      hasWinningMarks: false
    }
    const grid = createGrid(gridOptions)

    const result = checkRow({
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

  test('should check first row with true as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 0,
      start: 0,
      end: 2,
      mode: 'row',
      hasWinningMarks: false
    }
    const grid = createGrid(gridOptions)

    const result = checkRow({
      grid,
      startRowIdx,
      startColIdx,
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

  test('should check second row with true as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 1,
      start: 0,
      end: 2,
      mode: 'row',
      hasWinningMarks: false
    }
    const grid = createGrid(gridOptions)

    const result = checkRow({
      grid,
      startRowIdx: gridOptions.winIndex,
      startColIdx,
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

  test('should check third row with true as winning result', () => {
    const gridOptions = {
      N: 3,
      winIndex: 2,
      start: 0,
      end: 2,
      mode: 'row',
      hasWinningMarks: false
    }
    const grid = createGrid(gridOptions)

    const result = checkRow({
      grid,
      startRowIdx: gridOptions.winIndex,
      startColIdx,
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

  test('should check first row with true as winning result in a subrange', () => {
    const gridOptions = {
      N: 4,
      winIndex: 0,
      start: 1,
      end: 3,
      mode: 'row',
      hasWinningMarks: false
    }
    const grid = createGrid(gridOptions)

    const result = checkRow({
      grid,
      startRowIdx: gridOptions.winIndex,
      startColIdx,
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
