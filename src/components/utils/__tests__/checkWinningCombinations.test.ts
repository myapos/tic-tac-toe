import { expect, test, describe } from 'vitest'

import { checkWinningCombinations } from '../checkWinningCombinations'

import type { gridT } from '@/components/types.ts'

describe('checkWinningCombinations', () => {
  test('should count winning combinations on almost filled grid ', () => {
    const grid: gridT = [
      [
        ['X', ''],
        ['O', ''],
        ['X', '']
      ],
      [
        ['X', ''],
        ['O', ''],
        ['X', '']
      ],
      [
        ['X', ''],
        ['X', ''],
        ['X', '']
      ]
    ]

    const winningCombinations = checkWinningCombinations(grid, 2, 2, 3, true, false)

    expect(winningCombinations).toEqual(2)
  })
})
