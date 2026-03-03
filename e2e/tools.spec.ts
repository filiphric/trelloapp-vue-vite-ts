import { test, expect, DEFAULT_USER } from './fixtures'

test.describe('Tools', () => {
  let board: any
  let user: any

  test.beforeEach(async ({ api }) => {
    await api.resetData()
    user = await api.loginUser()
    board = await api.addBoardApi('new board')
    const list = await api.addListApi(board.id, 'new list')
    await api.addCardApi(board.id, list.id, 'new card')
  })

  test('show tools', async ({ page, api, request }) => {
    const boardId = board.id

    await page.goto(`/board/${boardId}`)

    await expect(page.getByTestId('card')).toBeVisible()
    await expect(page.getByTestId('list')).toBeVisible()

    // Open tools via keyboard event
    await page.keyboard.press('F2')

    await expect(page.getByTestId('api-tools')).toBeVisible()

    // Deletes users
    const usersPromise = page.waitForResponse((r) => r.url().includes('/api/users') && r.request().method() === 'DELETE')
    await page.getByText('Users').click()
    await usersPromise

    const loginResponse = await request.post('/api/login', {
      data: DEFAULT_USER,
      headers: { authorization: `Bearer ${user.accessToken}` },
      failOnStatusCode: false,
    })
    const loginBody = await loginResponse.text()
    expect(loginBody).toContain('Cannot find user')

    // Deletes cards
    const cardsPromise = page.waitForResponse((r) => r.url().includes('/api/cards') && r.request().method() === 'DELETE')
    await page.getByText('Cards').click()
    await cardsPromise
    await expect(page.getByTestId('card')).not.toBeVisible()

    // Deletes lists
    const listsPromise = page.waitForResponse((r) => r.url().includes('/api/lists') && r.request().method() === 'DELETE')
    await page.getByText('Lists').click()
    await listsPromise
    await expect(page.getByTestId('list')).not.toBeVisible()

    // Deletes boards
    const boardsPromise = page.waitForResponse((r) => r.url().includes('/api/boards') && r.request().method() === 'DELETE')
    await page.getByText('Boards').click()
    await boardsPromise
    await expect(page).toHaveURL('/')

    await expect(page.getByTestId('first-board')).toBeVisible()
  })

  test('resets all', async ({ page, api, request }) => {
    // Expose store to window (app only does this when window.Cypress is set)
    await page.addInitScript(() => {
 (window as any).Cypress = true 
})

    const boardId = board.id

    await page.goto(`/board/${boardId}`)

    await page.evaluate(() => (window as any).store.getState().toggleTools(true))

    await expect(page.getByTestId('api-tools')).toBeVisible()

    // Reset all
    const resetPromise = page.waitForResponse((r) => r.url().includes('/api/reset') && r.request().method() === 'POST')
    await page.getByText('All').click()
    await resetPromise

    await expect(page).toHaveURL('/')

    await expect(page.getByTestId('first-board')).toBeVisible()

    // Verify user is deleted
    const loginResponse = await request.post('/api/login', {
      data: DEFAULT_USER,
      headers: { authorization: `Bearer ${user.accessToken}` },
      failOnStatusCode: false,
    })
    const loginBody = await loginResponse.text()
    expect(loginBody).toContain('Cannot find user')

    // Verify lists are empty
    const listsResponse = await request.get('/api/lists', {
      headers: { accept: 'application/json' },
    })
    const listsBody = await listsResponse.json()
    expect(listsBody).toEqual([])

    // Verify cards are empty
    const cardsResponse = await request.get('/api/cards', {
      headers: { accept: 'application/json' },
    })
    const cardsBody = await cardsResponse.json()
    expect(cardsBody).toEqual([])
  })
})
