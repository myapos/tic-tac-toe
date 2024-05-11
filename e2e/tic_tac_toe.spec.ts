import { test, expect } from '@playwright/test'

const url = 'http://localhost:5173/'
test.beforeEach(async ({ page }) => {
  await page.goto(url)
})

test.describe('initial load', () => {
  test('initial load', async ({ page }) => {
    await expect(page).toHaveTitle(/TIC TAC TOE/)
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await expect(await page.getByTestId('tic-tac-toe-wrapper')).toBeVisible()
    await expect(await page.getByTestId('tic-tac-toe-grid')).toBeVisible()
    await expect(await page.getByTestId('controls')).toBeVisible()
    await expect(await page.getByTestId('reset-btn')).toBeVisible()
    await expect(await page.getByTestId('toggle-details-btn')).toBeVisible()
  })

  test('details should be hidden on initial load', async ({ page }) => {
    const detailsButton = await page.getByTestId('toggle-details-btn')
    await expect(await page.getByTestId('details')).not.toBeVisible()
    detailsButton.click()
    await expect(await page.getByTestId('details')).toBeVisible()
    detailsButton.click()
    await expect(await page.getByTestId('details')).not.toBeVisible()
  })
})

test.describe('check cell', () => {
  test('should ignore clicking on already filled cell', async ({ page }) => {
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-0-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is O's turn!")
    await page.getByTestId('cell-0-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is O's turn!")
  })
})

test.describe('check row', () => {
  test('should win in first row starting from left to right', async ({ page }) => {
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-0-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is O's turn!")
    await page.getByTestId('cell-1-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-0-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is O's turn!")
    await page.getByTestId('cell-1-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-0-2').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })

  test('should win in first row starting from right to left', async ({ page }) => {
    await page.getByTestId('cell-0-2').click()
    await page.getByTestId('cell-1-1').click()
    await page.getByTestId('cell-0-1').click()
    await page.getByTestId('cell-1-0').click()
    await page.getByTestId('cell-0-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })

  test('should win in first row starting from right to left and final selection in the middle', async ({
    page
  }) => {
    await page.getByTestId('cell-0-2').click()
    await page.getByTestId('cell-1-1').click()
    await page.getByTestId('cell-0-0').click()
    await page.getByTestId('cell-1-0').click()
    await page.getByTestId('cell-0-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })
})

test.describe('check column', () => {
  test('should win in first column starting from top to bottom', async ({ page }) => {
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-0-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is O's turn!")
    await page.getByTestId('cell-0-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-1-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is O's turn!")
    await page.getByTestId('cell-1-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-2-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })

  test('should win in first column starting from bottom to top', async ({ page }) => {
    await page.getByTestId('cell-2-0').click()
    await page.getByTestId('cell-1-1').click()
    await page.getByTestId('cell-1-0').click()
    await page.getByTestId('cell-0-1').click()
    await page.getByTestId('cell-0-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })

  test('should win in first column starting from bottom to top and final selection in the middle', async ({
    page
  }) => {
    await page.getByTestId('cell-2-0').click()
    await page.getByTestId('cell-1-1').click()
    await page.getByTestId('cell-0-0').click()
    await page.getByTestId('cell-0-1').click()
    await page.getByTestId('cell-1-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })
})

test.describe('check primary', () => {
  test('should win in primary starting from top to bottom', async ({ page }) => {
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-0-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is O's turn!")
    await page.getByTestId('cell-0-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-1-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is O's turn!")
    await page.getByTestId('cell-1-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-2-2').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })

  test('should win in primary starting from bottom to top', async ({ page }) => {
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-2-2').click()
    await page.getByTestId('cell-1-0').click()
    await page.getByTestId('cell-1-1').click()
    await page.getByTestId('cell-0-1').click()
    await page.getByTestId('cell-0-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })

  test('should win in primary starting from bottom to top and final selection in the middle', async ({
    page
  }) => {
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-2-2').click()
    await page.getByTestId('cell-1-0').click()
    await page.getByTestId('cell-0-0').click()
    await page.getByTestId('cell-0-1').click()
    await page.getByTestId('cell-1-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })
})

test.describe('check secondary', () => {
  test('should win in first column starting from top to bottom', async ({ page }) => {
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-0-2').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is O's turn!")
    await page.getByTestId('cell-0-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-1-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is O's turn!")
    await page.getByTestId('cell-1-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText("It is X's turn!")
    await page.getByTestId('cell-2-0').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })

  test('should win in secondary starting from bottom to top', async ({ page }) => {
    await page.getByTestId('cell-2-0').click()
    await page.getByTestId('cell-1-0').click()
    await page.getByTestId('cell-1-1').click()
    await page.getByTestId('cell-0-1').click()
    await page.getByTestId('cell-0-2').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })

  test('should win in first row starting from bottom to top and final selection in the middle', async ({
    page
  }) => {
    await page.getByTestId('cell-2-0').click()
    await page.getByTestId('cell-1-0').click()
    await page.getByTestId('cell-0-2').click()
    await page.getByTestId('cell-0-1').click()
    await page.getByTestId('cell-1-1').click()
    await expect(await page.getByTestId('feedback')).toHaveText('Player X wins!')
  })
})
