import { test, expect } from './fixtures'

test('card actions', async ({ page, api }) => {
  await api.resetData()
  await api.loginUser()
  const board = await api.addBoardApi('new board')
  const boardId = board.id
  await api.addListApi(boardId, 'list 1')
  await api.addListApi(boardId, 'list 2')

  await page.goto(`/board/${boardId}`)

  // card create cancel - esc key
  await page.getByTestId('new-card').first().click()
  await page.getByTestId('new-card-input').pressSequentially('new card')
  await page.getByTestId('new-card-input').press('Escape')
  await expect(page.getByTestId('new-card-input')).not.toBeVisible()
  await expect(page.getByTestId('card')).not.toBeVisible()

  // click away
  await page.getByTestId('new-card').first().click()
  await page.getByTestId('board-detail').click({ force: true })
  await expect(page.getByTestId('new-card-input')).not.toBeVisible()
  await expect(page.getByTestId('card')).not.toBeVisible()

  // enter no input
  await page.getByTestId('new-card').first().click()
  await page.getByTestId('new-card-input').press('Enter')
  await expect(page.getByTestId('card')).not.toBeVisible()

  // cancel button
  await page.getByTestId('cancel').click()
  await expect(page.getByTestId('new-card-input')).not.toBeVisible()
  await expect(page.getByTestId('card')).not.toBeVisible()

  // create card
  const createCardPromise = page.waitForResponse((r) => r.url().includes('/api/cards') && r.request().method() === 'POST')
  await page.getByTestId('new-card').first().click()
  await page.getByTestId('new-card-input').first().pressSequentially('card 1')
  await page.getByTestId('new-card-input').first().press('Enter')
  const createCardResponse = await createCardPromise
  const createCardBody = JSON.parse(createCardResponse.request().postData()!)
  expect(createCardBody.name).toBe('card 1')
  await expect(page.getByTestId('card')).toBeVisible()

  // card edit icon
  await page.getByTestId('card').hover()
  await expect(page.getByTestId('card-edit')).toBeVisible()

  // card complete
  const patchCardPromise = page.waitForResponse((r) => r.url().includes('/api/cards/') && r.request().method() === 'PATCH')
  await page.getByTestId('card-checkbox').click()
  const checkResponse = await patchCardPromise
  const checkBody = JSON.parse(checkResponse.request().postData()!)
  expect(checkBody.completed).toBe(true)

  const uncheckPromise = page.waitForResponse((r) => r.url().includes('/api/cards/') && r.request().method() === 'PATCH')
  await page.getByTestId('card-checkbox').click()
  const uncheckResponse = await uncheckPromise
  const uncheckBody = JSON.parse(uncheckResponse.request().postData()!)
  expect(uncheckBody.completed).toBe(false)

  // uses dropdown to create card
  await page.getByTestId('list-options').nth(1).click()
  await page.getByTestId('card-add').click()
  await expect(page.getByTestId('new-card-input')).toBeVisible()
  await expect(page.getByTestId('new-card-input')).toBeFocused()
  const createCard2Promise = page.waitForResponse((r) => r.url().includes('/api/cards') && r.request().method() === 'POST')
  await page.getByTestId('new-card-input').pressSequentially('card 2')
  await page.getByTestId('new-card-input').press('Enter')
  const createCard2Response = await createCard2Promise
  const createCard2Body = JSON.parse(createCard2Response.request().postData()!)
  expect(createCard2Body.name).toBe('card 2')
  await expect(page.getByTestId('card')).toHaveCount(2)
  await page.getByTestId('new-card-input').press('Escape')

  // card move (drag and drop)
  const sourceCard = page.getByTestId('card').first()
  const targetList = page.getByTestId('card-list').nth(1)
  await sourceCard.dragTo(targetList)

  // card create error
  await page.route('**/api/cards', async (route) => {
    if (route.request().method() === 'POST') {
      await route.abort()
    }
 else {
      await route.continue()
    }
  })
  await page.getByTestId('new-card').first().click()
  await page.getByTestId('new-card-input').pressSequentially('new card')
  await page.getByTestId('new-card-input').press('Enter')
  await expect(page.getByTestId('notification-message')).toBeVisible()
  await expect(page.getByTestId('notification-message')).toContainText('Card was not created')
})
