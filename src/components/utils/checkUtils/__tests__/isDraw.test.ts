import { expect, test, describe } from 'vitest'

import createGrid from '../createGrid'
import isDraw from '../isDraw'

describe('isDraw', () => {
  test('should check draw with false result', () => {
    const emptyGridOptions = {
      N: 4,
      winIndex: 0,
      start: 0,
      end: 3,
      mode: 'empty',
      hasWinningMarks: false
    }
    const grid = createGrid(emptyGridOptions)

    const result = isDraw({ grid })

    expect(result).toEqual(false)
  })
  test('should check draw with true result', () => {
    const emptyGridOptions = {
      N: 4,
      winIndex: 0,
      start: 0,
      end: 3,
      mode: 'draw',
      hasWinningMarks: false
    }
    const grid = createGrid(emptyGridOptions)
    const result = isDraw({ grid })

    expect(result).toEqual(true)
  })
})
