import { test, expect } from '@playwright/test'

test.describe('initial load with a 1x1 grid', () => {
  const url = 'http://localhost:5173/?N=1&M=1'
  test.beforeEach(async ({ page }) => {
    await page.goto(url)
  })
  test('initial load', async ({ page }) => {
    await expect(page).toHaveTitle(/TIC TAC TOE/)
    await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await expect(page.getByTestId('tic-tac-toe-wrapper')).toBeVisible()
    await expect(page.getByTestId('tic-tac-toe-grid')).toBeVisible()
    await expect(page.getByTestId('controls')).toBeVisible()
    await expect(page.getByTestId('reset-btn')).toBeVisible()
    await expect(page.getByTestId('toggle-details-btn')).toBeVisible()
  })

  test('details should be hidden on initial load', async ({ page }) => {
    const detailsButton = page.getByTestId('toggle-details-btn')
    await expect(page.getByTestId('details')).not.toBeVisible()
    detailsButton.click()
    await expect(page.getByTestId('details')).toBeVisible()
    detailsButton.click()
    await expect(page.getByTestId('details')).not.toBeVisible()
  })
})

test.describe('search a 3x3 grid', () => {
  const url = 'http://localhost:5173/?N=3&M=3'
  test.beforeEach(async ({ page }) => {
    await page.goto(url)
  })

  test.describe('check cell', () => {
    test('should ignore clicking on already filled cell', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-0-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
    })
  })

  test.describe('check row', () => {
    test('should win in first row starting from left to right', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-1-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-1-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-2').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in first row starting from right to left', async ({ page }) => {
      await page.getByTestId('cell-0-2').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-0-0').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in first row starting from right to left and final selection in the middle', async ({
      page
    }) => {
      await page.getByTestId('cell-0-2').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-0-0').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-0-1').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })
  })

  test.describe('check column', () => {
    test('should win in first column starting from top to bottom', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-0-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-1-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-1-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-2-0').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in first column starting from bottom to top', async ({ page }) => {
      await page.getByTestId('cell-2-0').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-0-0').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in first column starting from bottom to top and final selection in the middle', async ({
      page
    }) => {
      await page.getByTestId('cell-2-0').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-0-0').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-1-0').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })
  })

  test.describe('check primary', () => {
    test('should win in primary starting from top to bottom', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-0-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-1-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-1-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-2-2').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in primary starting from bottom to top', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-2-2').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-0-0').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in primary starting from bottom to top and final selection in the middle', async ({
      page
    }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-2-2').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-0-0').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-1-1').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })
  })

  test.describe('check secondary', () => {
    test('should win in first column starting from top to bottom', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-2').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-0-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-1-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-1-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-2-0').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in secondary starting from bottom to top', async ({ page }) => {
      await page.getByTestId('cell-2-0').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-0-2').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in first row starting from bottom to top and final selection in the middle', async ({
      page
    }) => {
      await page.getByTestId('cell-2-0').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-0-2').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-1-1').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })
  })
})

test.describe('search a 4x3 grid', () => {
  const url = 'http://localhost:5173/?N=4&M=3'
  test.beforeEach(async ({ page }) => {
    await page.goto(url)
  })

  test.describe('check row', () => {
    test('should win in first row starting from left to right', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-1-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-2').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-1-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-3').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in first row starting from right to left', async ({ page }) => {
      await page.getByTestId('cell-0-3').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-0-2').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-0-1').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in first row starting from right to left and final selection in the middle', async ({
      page
    }) => {
      await page.getByTestId('cell-0-3').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-0-2').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })
  })

  test.describe('check column', () => {
    test('should win in first column starting from top to bottom', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-1-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-0-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-2-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-1-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-3-0').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in first column starting from bottom to top', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-3-0').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-2-0').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-1-0').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in first column starting from bottom to top and final selection in the middle', async ({
      page
    }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-3-0').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-2-0').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })
  })

  test.describe('check primary', () => {
    test('should win in primary starting from top to bottom', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-1-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-0-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-2-2').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-1-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-3-3').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in primary starting from bottom to top', async ({ page }) => {
      await page.getByTestId('cell-3-3').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-2-2').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-1-1').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in primary starting from bottom to top and final selection in the middle', async ({
      page
    }) => {
      await page.getByTestId('cell-3-3').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-1-1').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-2-2').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })
  })

  test.describe('check secondary', () => {
    test('should win in first column starting from top to bottom', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-3').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-0-1').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-1-2').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-1-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-2-1').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in secondary starting from bottom to top', async ({ page }) => {
      await page.getByTestId('cell-2-1').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-1-2').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-0-3').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })

    test('should win in first row starting from bottom to top and final selection in the middle', async ({
      page
    }) => {
      await page.getByTestId('cell-2-1').click()
      await page.getByTestId('cell-1-0').click()
      await page.getByTestId('cell-0-3').click()
      await page.getByTestId('cell-0-1').click()
      await page.getByTestId('cell-1-2').click()
      await expect(page.getByTestId('feedback')).toHaveText('Player X wins!')
    })
  })
})

test.describe('invalid parameters', () => {
  const url = 'http://localhost:5173/?N=1&M=2'
  test.beforeEach(async ({ page }) => {
    await page.goto(url)
  })
  test('initial load', async ({ page }) => {
    await expect(page.getByTestId('not-valid-params')).toBeVisible()
    await expect(page.getByTestId('tic-tac-toe-wrapper')).not.toBeVisible()
  })
})
