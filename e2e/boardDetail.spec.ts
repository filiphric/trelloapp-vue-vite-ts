import { test, expect } from './fixtures'

const oldName = 'board'
const newName = 'new board'

test('board detail actions', async ({ page, api }) => {
  await api.resetData()
  await api.loginUser()
  const board = await api.addBoardApi(oldName)
  const boardId = board.id

  await page.goto(`/board/${boardId}`)

  // rename cancel
  await expect(page.getByTestId('board-title')).toHaveValue(oldName)
  await page.getByTestId('board-title').click()
  await page.getByTestId('board-detail').click({ force: true })
  await page.getByTestId('board-title').press('Escape')
  await expect(page.getByTestId('board-title')).toHaveValue(oldName)

  // rename board
  const renamePromise = page.waitForResponse((r) => r.url().includes('/api/boards/') && r.request().method() === 'PATCH')
  await page.getByTestId('board-title').click()
  await page.getByTestId('board-title').pressSequentially(newName)
  await page.getByTestId('board-title').press('Enter')
  const renameResponse = await renamePromise
  const renameBody = JSON.parse(renameResponse.request().postData()!)
  expect(renameBody.name).toBe(newName)
  await expect(page.getByTestId('board-title')).toHaveValue(newName)

  // star board
  const starPromise = page.waitForResponse((r) => r.url().includes('/api/boards/') && r.request().method() === 'PATCH')
  await page.getByTestId('star').click()
  const starResponse = await starPromise
  const starBody = JSON.parse(starResponse.request().postData()!)
  expect(starBody.starred).toBe(true)

  // dropdown actions
  await page.getByTestId('board-options').click()
  await expect(page.getByTestId('board-dropdown')).toBeVisible()
  await page.getByTestId('cancel').click()
  await expect(page.getByTestId('board-dropdown')).not.toBeVisible()
  await page.getByTestId('board-options').click()
  await expect(page.getByTestId('board-dropdown')).toBeVisible()
  await page.locator('body').click({ force: true })
  await expect(page.getByTestId('board-dropdown')).not.toBeVisible()

  // delete board
  const deletePromise = page.waitForResponse((r) => r.url().includes('/api/boards/') && r.request().method() === 'DELETE')
  await page.getByTestId('board-options').click()
  await page.getByTestId('delete-board').click()
  const deleteResponse = await deletePromise
  expect(deleteResponse.status()).toBe(200)
  await expect(page.getByTestId('board-dropdown')).not.toBeVisible()
  await expect(page).toHaveURL('/')
})
