import { test, expect } from './fixtures'

test('board actions', async ({ page, api }) => {
  await api.resetData()
  await api.loginUser()

  await page.goto('/')

  // create first board
  await page.getByTestId('first-board').pressSequentially('new board')
  await page.getByTestId('first-board').press('Enter')
  await page.waitForResponse((r) => r.url().includes('/api/boards') && r.request().method() === 'POST')
  await expect(page.getByTestId('board-detail')).toBeVisible()
  await expect(page.getByTestId('loading')).not.toBeVisible()
  await page.getByTestId('home').click()

  // star board
  const starPromise = page.waitForResponse((r) => r.url().includes('/api/boards/') && r.request().method() === 'PATCH')
  await expect(page.getByTestId('board-item')).toBeVisible()
  await expect(page.getByTestId('starred-boards')).not.toBeVisible()
  await page.getByTestId('board-item').hover()
  await page.getByTestId('star').click()
  const starResponse = await starPromise
  const starBody = JSON.parse(starResponse.request().postData()!)
  expect(starBody.starred).toBe(true)
  await expect(page.getByTestId('starred-boards')).toBeVisible()

  // board create field
  await page.getByTestId('create-board').click()
  await page.getByTestId('board-list').click({ force: true })
  await expect(page.getByTestId('new-board-input')).not.toBeVisible()
  await page.getByTestId('create-board').click()
  await page.getByTestId('new-board-input').press('Enter')
  await page.getByTestId('create-board').click()
  await page.getByTestId('cancel').click()
  await expect(page).toHaveURL('/')
  await expect(page.getByTestId('board-item')).toHaveCount(1)
  await expect(page.getByTestId('create-board')).toBeVisible()

  // create second board with enter key
  await page.getByTestId('create-board').click()
  await expect(page.getByTestId('new-board-input')).toBeFocused()
  await page.getByTestId('new-board-input').pressSequentially('new board')
  await page.getByTestId('new-board-input').press('Enter')
  await page.waitForResponse((r) => r.url().includes('/api/boards') && r.request().method() === 'POST')
  await expect(page.getByTestId('board-detail')).toBeVisible()
  await expect(page.getByTestId('loading')).not.toBeVisible()

  await page.getByTestId('trello-logo').click()

  // create third board with click
  await page.getByTestId('create-board').click()
  await page.getByTestId('new-board-input').pressSequentially('new board')
  await page.getByTestId('new-board-create').click()
  await page.waitForResponse((r) => r.url().includes('/api/boards') && r.request().method() === 'POST')
  await expect(page.getByTestId('board-detail')).toBeVisible()
  await expect(page.getByTestId('loading')).not.toBeVisible()

  await page.goBack()

  // show error message on network error
  const errorRouteHandler = async (route: any) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 500 })
      await page.unroute('**/api/boards', errorRouteHandler)
    }
 else {
      await route.continue()
    }
  }
  await page.route('**/api/boards', errorRouteHandler)
  await page.getByTestId('create-board').click()
  await page.getByTestId('new-board-input').pressSequentially('new')
  await page.getByTestId('new-board-input').press('Enter')
  await expect(page.getByTestId('notification-message')).toBeVisible()
  await expect(page.getByTestId('notification-message')).not.toBeVisible({ timeout: 10000 })
  await expect(page).toHaveURL('/')
  await expect(page.getByTestId('board-item')).toHaveCount(3)
  await expect(page.getByTestId('new-board-input')).toBeVisible()

  // shows network error when boards are not loaded
  await page.route('**/api/boards', async (route) => {
    await route.fulfill({ status: 404 })
  }, { times: 1 })
  await page.reload()
  await expect(page.getByTestId('board-list-error-message')).toContainText('There was an error loading your boards')

  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByTestId('board-item').first()).toBeVisible({ timeout: 10000 })
})
