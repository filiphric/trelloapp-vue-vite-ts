import { test, expect } from './fixtures'

test.describe('Login', () => {
  const user = {
    email: 'filip@example.com',
    password: 'Asdf.1234#',
  }

  test.beforeEach(async ({ api }) => {
    await api.resetData()
    await api.signupApi(user.email, user.password, false)
  })

  test('logs in a user (click)', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('login-menu')).toBeVisible()
    await page.getByTestId('login-menu').click()

    await expect(page).toHaveURL('/login')

    await page.getByTestId('login-email').fill(user.email)
    await page.getByTestId('login-password').fill('invalid')
    await page.getByTestId('login-password').press('Enter')

    await expect(page.getByTestId('notification-message')).toContainText('Incorrect password')

    await expect(page).toHaveURL('/')

    await page.goBack()

    await page.getByTestId('login-password').clear()
    await page.getByTestId('login-password').fill(user.password)
    await page.getByTestId('login-submit').click()

    await expect(page).toHaveURL('/')

    const cookies = await page.context().cookies()
    expect(cookies.some((c) => c.name === 'auth_token')).toBe(true)

    await page.getByTestId('logged-user').click()

    await expect(page.getByTestId('notification-message')).toContainText('User was logged out')
  })

  test('logs in a user (enter)', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('login-menu')).toBeVisible()
    await page.getByTestId('login-menu').click()

    await expect(page).toHaveURL('/login')

    await page.getByTestId('login-email').fill(user.email)
    await page.getByTestId('login-password').fill(user.password)
    await page.getByTestId('login-password').press('Enter')

    await expect(page).toHaveURL('/')

    const cookies = await page.context().cookies()
    expect(cookies.some((c) => c.name === 'auth_token')).toBe(true)

    await page.getByTestId('logged-user').click()

    await expect(page.getByTestId('notification-message')).toContainText('User was logged out')
  })

  test('shows error on invalid login', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'auth_token',
        value: 'invalid',
        domain: 'localhost',
        path: '/',
      },
    ])

    await page.goto('/login')

    await expect(page.getByTestId('notification-message')).toContainText('Invalid authorization')
  })
})
