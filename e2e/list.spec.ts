import { test, expect } from './fixtures'

test('list actions', async ({ page, api }) => {
  await api.resetData()
  await api.loginUser()
  const board = await api.addBoardApi('new board')
  const boardId = board.id

  const list1 = 'list1'
  const list2 = 'list2'

  // set up first POST /api/lists to return 500 (self-unregistering to not affect GETs)
  const listErrorHandler = async (route: any) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 500 })
      await page.unroute('**/api/lists', listErrorHandler)
    }
 else {
      await route.continue()
    }
  }
  await page.route('**/api/lists', listErrorHandler)

  await page.goto(`/board/${boardId}`)

  // wait for login notification to clear before testing error notifications
  await expect(page.getByTestId('notification-message')).toContainText('User is logged in')
  await expect(page.getByTestId('notification-message')).not.toBeVisible({ timeout: 6000 })

  // show error message
  await expect(page.getByTestId('add-list-input')).toBeVisible()
  await page.getByTestId('add-list-input').pressSequentially('new list')
  await page.getByTestId('add-list-input').press('Enter')
  await expect(page.getByTestId('notification-message')).toBeVisible()
  await expect(page.getByTestId('notification-message')).toContainText('List was not created')

  // does not accept empty list names
  await page.getByTestId('add-list-input').press('Enter')
  await expect(page.getByTestId('list')).not.toBeVisible()
  await expect(page.getByTestId('add-list-input')).toBeFocused()

  // cancels list creation - esc
  await page.getByTestId('add-list-input').pressSequentially(list1)
  await page.getByTestId('add-list-input').press('Escape')
  await expect(page.getByTestId('list')).not.toBeVisible()
  await expect(page.getByTestId('add-list-input')).not.toBeVisible()

  // cancel button
  await page.getByTestId('create-list').click()
  await page.getByTestId('cancel').click()
  await expect(page.getByTestId('list')).not.toBeVisible()
  await expect(page.getByTestId('add-list-input')).not.toBeVisible()

  // click away
  await page.getByTestId('create-list').click()
  await page.getByTestId('add-list-input').click()
  await page.getByTestId('board-detail').click({ force: true })

  // create a list
  await page.getByTestId('create-list').click()
  await expect(page.getByTestId('add-list-input')).toBeFocused()
  await page.getByTestId('add-list-input').pressSequentially(list1)
  await page.getByTestId('add-list-input').press('Enter')
  await page.getByText('Add list').click()
  await expect(page.getByTestId('list')).toHaveCount(1)

  // rename list
  await page.getByTestId('list-name').click()
  await page.getByTestId('list-name').pressSequentially('renamed list')
  await page.getByTestId('list-name').press('Enter')
  await expect(page.getByTestId('list-name')).toHaveValue('renamed list')

  // open and close dropdown
  await page.getByTestId('list-options').click()
  await expect(page.getByTestId('list-dropdown')).toBeVisible()
  await page.getByTestId('cancel').click()
  await page.getByTestId('list-options').click()
  await page.getByTestId('board-detail').click({ force: true })
  await expect(page.getByTestId('list-dropdown')).not.toBeVisible()

  // delete list
  await page.getByTestId('list-options').click()
  await page.getByTestId('delete-list').click()
  await expect(page.getByTestId('list')).not.toBeVisible()

  // create first list
  await page.getByTestId('create-list').click()
  await page.getByTestId('add-list-input').pressSequentially(list1)
  await page.getByTestId('add-list-input').press('Enter')
  await expect(page.getByTestId('list')).toHaveCount(1)

  // create second list
  await page.getByTestId('add-list-input').pressSequentially(list2)
  await page.getByTestId('add-list-input').press('Enter')
  await expect(page.getByTestId('list')).toHaveCount(2)

  // reorder lists
  await expect(page.getByTestId('list-name').first()).toHaveValue(list1)
  await expect(page.getByTestId('list-name').nth(1)).toHaveValue(list2)

  const source = page.getByTestId('list-placeholder').first()
  const target = page.getByTestId('list-placeholder').nth(1)
  const sourceBox = await source.boundingBox()
  const targetBox = await target.boundingBox()
  const startX = sourceBox!.x + sourceBox!.width / 2
  const startY = sourceBox!.y + sourceBox!.height / 2
  const endX = targetBox!.x + targetBox!.width * 0.75
  const endY = targetBox!.y + targetBox!.height / 2

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.waitForTimeout(100)
  await page.mouse.move(startX + 10, startY, { steps: 3 })
  await page.waitForTimeout(200)
  await page.mouse.move(endX, endY, { steps: 20 })
  await page.waitForTimeout(200)
  await page.mouse.up()

  await expect(page.getByTestId('list-name').nth(1)).toHaveValue(list1)
  await expect(page.getByTestId('list-name').first()).toHaveValue(list2)
})
