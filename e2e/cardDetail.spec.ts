import { test, expect } from './fixtures'
import path from 'path'

test('card detail actions', async ({ page, api }) => {
  await api.resetData()
  await api.loginUser()
  const board = await api.addBoardApi('new board')
  const list = await api.addListApi(board.id, 'new list')
  const card = await api.addCardApi(board.id, list.id, 'new card')

  const boardId = board.id
  const cardId = card.id

  await page.goto(`/board/${boardId}?card=${cardId}`)

  // closing and opening card
  await expect(page.getByTestId('card-detail')).toBeVisible()
  await page.getByTestId('card-detail-backdrop').click({ force: true, position: { x: 10, y: 10 } })
  await expect(page.getByTestId('card-detail')).not.toBeVisible()
  await page.getByTestId('card').click()
  await expect(page.getByTestId('card-detail')).toBeVisible()
  await page.getByTestId('cancel').click()
  await expect(page.getByTestId('card-detail')).not.toBeVisible()
  await page.getByTestId('card').click()

  // card properties - copy to clipboard
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.getByTestId('copy-properties').click()
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
  expect(clipboardText).toBe(JSON.stringify(card, null, 2))
  await expect(page.getByTestId('notification-message')).toBeVisible()
  await expect(page.getByTestId('notification-message')).toContainText('Card info copied to clipboard')

  // card rename
  const renamePromise = page.waitForResponse((r) => r.url().includes('/api/cards/') && r.request().method() === 'PATCH')
  await page.getByTestId('card-detail-title').click()
  await page.getByTestId('card-detail-title').pressSequentially('new name')
  await page.getByTestId('card-detail-title').press('Enter')
  const renameResponse = await renamePromise
  const renameBody = JSON.parse(renameResponse.request().postData()!)
  expect(renameBody.name).toBe('new name')
  await expect(page.getByTestId('card-detail-title')).toHaveValue('new name')
  await page.getByTestId('card-detail-title').press('Escape')
  await expect(page.getByTestId('card-detail-title')).toHaveValue('new name')
  await expect(page.getByTestId('notification-message')).toBeVisible()
  await expect(page.getByTestId('notification-message')).toContainText('Card was renamed')

  // card deadline hide
  await page.getByTestId('calendar-dropdown').click()
  await expect(page.getByTestId('card-detail-deadline')).toBeVisible()
  await page.getByTestId('card-detail').click({ position: { x: 10, y: 10 } })
  await expect(page.getByTestId('card-detail-deadline')).not.toBeVisible()

  // card deadline select
  const deadlinePromise = page.waitForResponse((r) => r.url().includes('/api/cards/') && r.request().method() === 'PATCH')
  await page.getByTestId('calendar-button').click()
  await expect(page.getByTestId('card-detail-deadline')).toBeVisible()
  await page.getByTestId('card-detail-deadline').locator('.react-datepicker__year-select').selectOption('2021')
  await page.getByTestId('card-detail-deadline').locator('.react-datepicker__month-select').selectOption('7')
  await page.getByTestId('card-detail-deadline').locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)').filter({ hasText: /^15$/ }).click()
  const deadlineResponse = await deadlinePromise
  const deadlineBody = await deadlineResponse.json()
  expect(deadlineBody.deadline).toBe('2021-08-15')

  // card description
  const descPromise = page.waitForResponse((r) => r.url().includes('/api/cards/') && r.request().method() === 'PATCH')
  await page.getByTestId('card-description').pressSequentially('new description')
  await page.getByTestId('card-description').press('Enter')
  const descResponse = await descPromise
  const descBody = JSON.parse(descResponse.request().postData()!)
  expect(descBody.description).toBe('new description')

  // image upload
  const uploadPromise = page.waitForResponse((r) => r.url().includes('/api/upload?card=') && r.request().method() === 'POST')
  await page.getByTestId('upload-image').locator('input[type="file"]').setInputFiles(path.join(__dirname, 'fixtures', 'cypressLogo.png'))
  const uploadResponse = await uploadPromise
  const uploadBody = await uploadResponse.json()
  expect(uploadBody.image).toBeTruthy()
  await expect(page.getByTestId('image-attachment')).toBeVisible()
  await expect(page.getByTestId('notification-message')).toBeVisible()
  await expect(page.getByTestId('notification-message')).toContainText('File was sucessfully uploaded')

  // image delete
  const imageDeletePromise = page.waitForResponse((r) => r.url().includes('/api/cards/') && r.request().method() === 'PATCH')
  await page.getByTestId('image-delete').click()
  const imageDeleteResponse = await imageDeletePromise
  const imageDeleteBody = await imageDeleteResponse.json()
  expect(imageDeleteBody.image).toBeNull()
  await expect(page.getByTestId('image-attachment')).not.toBeVisible()
  await expect(page.getByTestId('upload-image')).toBeVisible()

  // error when upload does not work
  await page.route('**/api/upload**', async (route) => {
    await route.fulfill({ status: 400 })
  })
  await page.getByTestId('upload-image').locator('input[type="file"]').setInputFiles(path.join(__dirname, 'fixtures', 'cypressLogo.png'))
  await expect(page.getByTestId('notification-message')).toBeVisible()
  await expect(page.getByTestId('notification-message')).toContainText('There was an error uploading file')

  // delete a card
  const deletePromise = page.waitForResponse((r) => r.url().includes('/api/cards/') && r.request().method() === 'DELETE')
  await page.getByTestId('card-detail-delete').click()
  const deleteResponse = await deletePromise
  expect(deleteResponse.status()).toBe(200)
  await expect(page.getByTestId('card-detail')).not.toBeVisible()
  await expect(page.getByTestId('notification-message')).toBeVisible()
  await expect(page.getByTestId('notification-message')).toContainText('Card was deleted')
})
