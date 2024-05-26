import { test, expect } from '@playwright/test'

const defaultGridUrl = 'http://localhost:5173'
const customGridUrl = 'http://localhost:5173/?N=4&M=3'
const customGrid3X3 = 'http://localhost:5173/?N=3&M=3'
const gridUrl1X1 = 'http://localhost:5173/?N=1&M=1'
const randomUrl = '/a_random_url'
const invalidUrl = 'http://localhost:5173/?N=1&M=2'

test.describe('initial load with a 1x1 grid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(gridUrl1X1)
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
  test.beforeEach(async ({ page }) => {
    await page.goto(customGrid3X3)
  })

  test.describe('2P mode check cell', () => {
    test('should ignore clicking on already filled cell', async ({ page }) => {
      await expect(page.getByTestId('feedback')).toHaveText("It is X's turn!")
      await page.getByTestId('cell-0-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
      await page.getByTestId('cell-0-0').click()
      await expect(page.getByTestId('feedback')).toHaveText("It is O's turn!")
    })
  })

  test.describe('2P mode check row', () => {
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

  test.describe('2P mode check column', () => {
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

  test.describe('2P mode check primary', () => {
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

  test.describe('2P mode check secondary', () => {
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

  test("2P mode it's a draw", async ({ page }) => {
    await page.getByTestId('cell-1-1').click()
    await page.getByTestId('cell-0-1').click()
    await page.getByTestId('cell-2-1').click()
    await page.getByTestId('cell-1-2').click()
    await page.getByTestId('cell-1-0').click()
    await page.getByTestId('cell-0-0').click()
    await page.getByTestId('cell-0-2').click()
    await page.getByTestId('cell-2-0').click()
    await page.getByTestId('cell-2-2').click()
    await expect(page.getByTestId('feedback')).toHaveText('It is a draw. No one wins.')
  })

  test('1P mode should loose', async ({ page }) => {
    await page.getByTestId('1P').click()
    await page.getByTestId('cell-0-0').click()
    await page.getByTestId('cell-1-0').click()
    await page.getByTestId('cell-0-1').click()

    await expect(page.getByTestId('feedback')).toHaveText('Player O wins!')
  })

  test('1P mode should be a draw', async ({ page }) => {
    await page.getByTestId('1P').click()
    await page.getByTestId('cell-0-0').click()
    await page.getByTestId('cell-1-0').click()
    await page.getByTestId('cell-0-2').click()
    await page.getByTestId('cell-2-1').click()
    await page.getByTestId('cell-2-2').click()

    await expect(page.getByTestId('feedback')).toHaveText('It is a draw. No one wins.')
  })

  test('1P mode O should win', async ({ page }) => {
    await page.getByTestId('1P').click()
    await page.getByTestId('cell-0-1').click()
    await page.getByTestId('cell-2-1').click()
    await page.getByTestId('cell-1-2').click()
    await page.getByTestId('cell-2-2').click()

    await expect(page.getByTestId('feedback')).toHaveText('Player O wins!')
  })

  test('1P mode O should should defend', async ({ page }) => {
    await page.getByTestId('1P').click()
    await page.getByTestId('cell-0-0').click()
    await page.getByTestId('cell-0-1').click()
    await page.getByTestId('cell-2-0').click()
    await page.getByTestId('cell-1-2').click()
    await page.getByTestId('cell-2-2').click()

    await expect(page.getByTestId('feedback')).toHaveText('It is a draw. No one wins.')
  })
})

test.describe('search a 4x3 grid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(customGridUrl)
  })

  test.describe('2P mode check row', () => {
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

  test.describe('2P mode check column', () => {
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

  test.describe('2P mode check primary', () => {
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

  test.describe('2P mode check secondary', () => {
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
  test.beforeEach(async ({ page }) => {
    await page.goto(invalidUrl)
  })
  test('initial load', async ({ page }) => {
    await expect(page.getByTestId('not-valid-params')).toBeVisible()
    await expect(page.getByTestId('tic-tac-toe-wrapper')).not.toBeVisible()
  })
})

test.describe('router', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(defaultGridUrl)
  })

  test('should redirect to /', async ({ page }) => {
    await page.goto(defaultGridUrl + randomUrl)
    await expect(page).toHaveURL(defaultGridUrl)
  })
})

test.describe('load default grid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(defaultGridUrl)
  })

  test('should be visible', async ({ page }) => {
    const loadDefaultBtn = page.getByTestId('load-grid-btn')
    await expect(loadDefaultBtn).toBeVisible()
    await expect(loadDefaultBtn).toHaveText('Load Large Grid')
  })

  test('should be enabled with custom grid', async ({ page }) => {
    await page.goto(customGridUrl)
    const loadDefaultBtn = page.getByTestId('load-grid-btn')
    await expect(loadDefaultBtn).toHaveText('Load Default Grid')
  })

  test('should load default grid', async ({ page }) => {
    await page.goto(customGridUrl)
    const loadDefaultBtn = page.getByTestId('load-grid-btn')
    await loadDefaultBtn.click()
    const gridCells = await page.$$('.grid-cell')
    const numOfCells = gridCells.length
    expect(numOfCells).toBe(9)
  })

  test('should load large grid', async ({ page }) => {
    await page.goto(defaultGridUrl)
    const loadDefaultBtn = page.getByTestId('load-grid-btn')
    await loadDefaultBtn.click()
    const gridCells = await page.$$('.grid-cell')
    const numOfCells = gridCells.length
    expect(numOfCells).toBe(16)
  })
})
