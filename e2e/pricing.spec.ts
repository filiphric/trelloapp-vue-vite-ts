import { test, expect } from './fixtures'

test('shows pricing', async ({ page }) => {
  // USD
  await page.route('**/api/location', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        location: 'us',
        currency: 'USD',
        discountEligible: false,
      }),
    })
  }, { times: 1 })

  const locationUSPromise = page.waitForResponse((r) => r.url().includes('/api/location'))
  await page.goto('/pricing')
  await locationUSPromise

  await expect(page.getByTestId('plan-item').nth(1)).toHaveClass(/border-blue6/)
  await page.getByTestId('plan-item').first().click()
  await expect(page.getByTestId('plan-item').first()).toHaveClass(/border-blue6/)
  await expect(page.getByTestId('plan-item').nth(1)).not.toHaveClass(/border-blue6/)

  await expect(page.getByTestId('plan-price').first()).toContainText('$')

  // GBP
  await page.route('**/api/location', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        location: 'uk',
        currency: 'GBP',
        discountEligible: false,
      }),
    })
  }, { times: 1 })

  const locationUKPromise = page.waitForResponse((r) => r.url().includes('/api/location'))
  await page.reload()
  await locationUKPromise

  await expect(page.getByTestId('plan-price').first()).toContainText('£')

  // EUR with discount
  await page.route('**/api/location', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        location: 'sk',
        currency: 'EUR',
        discountEligible: true,
        discountAmount: 20,
      }),
    })
  }, { times: 1 })

  const locationEUPromise = page.waitForResponse((r) => r.url().includes('/api/location'))
  await page.reload()
  await locationEUPromise

  await expect(page.getByTestId('plan-price').first()).toContainText('€')
  await expect(page.getByTestId('discount')).toBeVisible()
  await expect(page.getByTestId('discount')).toContainText('20%')
})

test('shows map', async ({ page }) => {
  // Mock geolocation
  await page.context().setGeolocation({ latitude: 41.38879, longitude: 2.15899 })
  await page.context().grantPermissions(['geolocation'])

  await page.goto('/pricing')

  await page.getByTestId('find-location').click()

  await expect(page.locator('#map')).toBeVisible()
})
