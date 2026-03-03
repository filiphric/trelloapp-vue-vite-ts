import { test, expect } from './fixtures'

test.describe('main page', () => {
  test('has 404 page', async ({ page, api }) => {
    await api.resetData()
    await api.loginUser()
    const board = await api.addBoardApi('new board')
    const boardId = board.id

    await page.goto('/board/9999999999')
    await expect(page.getByTestId('board-list-error-message')).toBeVisible()

    await page.getByText('Go back home').click()
    await expect(page).toHaveURL('/')

    await page.goto(`/board/${boardId}?card=1`)
    await expect(page.getByTestId('notification-message')).toContainText('Card with id: 1 was not found')
  })
})
