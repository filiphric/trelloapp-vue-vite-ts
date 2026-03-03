import { test, expect } from './fixtures'

test.describe('Signup', () => {
  test.beforeEach(async ({ api }) => {
    await api.resetData()
  })

  test('sign up a user (click)', async ({ page }) => {
    const user = {
      email: 'filip@example.com',
      password: 'Asdf.1234#',
    }

    await page.goto('/signup')

    await page.getByTestId('signup-email').fill(user.email)
    await page.getByTestId('signup-password').fill(user.password)
    await page.getByTestId('signup-submit').click()

    await expect(page).toHaveURL('/')

    const cookies = await page.context().cookies()
    expect(cookies.some((c) => c.name === 'auth_token')).toBe(true)
  })

  test('sign up a user (enter)', async ({ page }) => {
    const user = {
      email: 'filip@example.com',
      password: 'Asdf.1234#',
    }

    await page.goto('/signup')

    await page.getByTestId('signup-email').fill(user.email)
    await page.getByTestId('signup-password').fill(user.password)
    await page.getByTestId('signup-password').press('Enter')

    await expect(page).toHaveURL('/')

    const cookies = await page.context().cookies()
    expect(cookies.some((c) => c.name === 'auth_token')).toBe(true)
  })
})
