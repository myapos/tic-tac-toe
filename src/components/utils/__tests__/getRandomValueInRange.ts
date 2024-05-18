import { expect, test, describe } from 'vitest'

import getRandomValueInRange from '../getRandomValueInRange'

describe('getRandomValueInRange', () => {
  test('should return a value between range', () => {
    const upperLimit = 3
    const randomValueInRange = getRandomValueInRange(upperLimit)

    expect(randomValueInRange).toBeGreaterThanOrEqual(0)
    expect(randomValueInRange).toBeLessThanOrEqual(upperLimit)
  })
})
