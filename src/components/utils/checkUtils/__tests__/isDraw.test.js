import { expect, test, describe } from 'vitest'
import createInitialGrid from '../utils'
import isDraw from '../isDraw.ts'

describe('isDraw', () => {
  test('should check draw with false result', () => {
    const emptyGridOptions = {
      N: 4,
      winIndex: 0,
      start: 0,
      end: 3,
      mode: '',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(emptyGridOptions)
    const result = isDraw({ grid, counter: 0 })

    expect(result).toEqual(false)
  })
  test('should check draw with true result', () => {
    const emptyGridOptions = {
      N: 4,
      winIndex: 0,
      start: 0,
      end: 3,
      mode: '',
      hasWinningMarks: false
    }
    const grid = createInitialGrid(emptyGridOptions)
    const result = isDraw({ grid, counter: Math.pow(emptyGridOptions.N, 2) })

    expect(result).toEqual(true)
  })
})
