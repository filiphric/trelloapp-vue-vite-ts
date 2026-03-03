import { test, expect } from './fixtures'

test('performs a card search', async ({ page, api }) => {
  await api.resetData()
  await api.loginUser()
  const board = await api.addBoardApi('new board')
  const list = await api.addListApi(board.id, 'new list')
  const card = await api.addCardApi(board.id, list.id, 'new card')

  const boardId = board.id
  const cardId = card.id

  // Expose store to window (app only does this when window.Cypress is set)
  await page.addInitScript(() => {
 (window as any).Cypress = true 
})

  await page.goto('/')

  await page.evaluate(() => (window as any).store.getState().toggleSearch(true))

  await page.getByTestId('search-input').pressSequentially('new card')
  await expect(page.getByTestId('result-item')).toBeVisible()
  await page.getByTestId('result-item').filter({ hasText: 'new card' }).click()

  await expect(page).toHaveURL(new RegExp(`/board/${boardId}\\?card=${cardId}`))

  // Search again (addInitScript persists across navigations)
  await page.waitForFunction(() => (window as any).store !== undefined)
  await page.evaluate(() => (window as any).store.getState().toggleSearch(true))
  await page.getByTestId('search-input').pressSequentially('n')
  await expect(page.getByTestId('result-item')).toBeVisible()
  await page.getByTestId('search-input').press('Backspace')
})
