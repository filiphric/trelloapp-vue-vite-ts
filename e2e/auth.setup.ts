import { test as setup } from '@playwright/test'

const USER = { email: 'filip@example.com', password: 'Asdf.1234#' }

export const STORAGE_STATE = 'e2e/.auth/user.json'

setup('authenticate', async ({ request, page }) => {
  await request.post('/api/reset')

  const response = await request.post('/api/signup', {
    data: USER,
  })
  const body = await response.json()

  await page.context().addCookies([
    {
      name: 'auth_token',
      value: body.accessToken,
      domain: 'localhost',
      path: '/',
    },
  ])

  await page.context().storageState({ path: STORAGE_STATE })
})
