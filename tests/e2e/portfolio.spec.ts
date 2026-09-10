import { expect, test } from '@playwright/test'

test.describe('portfolio journeys', () => {
  test('desktop visitor explores work and finds direct actions', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('desktop'), 'Desktop-only journey')
    await page.goto('/')

    await expect(
      page.getByRole('heading', { level: 1, name: /cedric ahumuza/i }),
    ).toBeVisible()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true)

    await page.getByRole('link', { name: 'Projects', exact: true }).first().click()
    const projectTab = page.getByRole('tab', { name: 'Fundi Production Monitor' })
    await projectTab.click()
    await expect(projectTab).toHaveAttribute('aria-selected', 'true')
    await expect(
      page.getByRole('region', { name: /project details/i }),
    ).toContainText('Real-time internal monitoring system')

    await expect(page.getByRole('link', { name: /mtunda uganda/i })).toHaveAttribute(
      'href',
      'https://www.mtunda.ug',
    )
    await expect(page.getByRole('link', { name: /^resume$/i }).first()).toHaveAttribute(
      'href',
      /drive\.google\.com/,
    )
    await expect(page.getByRole('link', { name: /contact me/i })).toHaveAttribute(
      'href',
      '#contact',
    )
  })

  test('mobile visitor can navigate from the responsive menu', async ({
    page,
  }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'Mobile-only journey')
    await page.goto('/')

    const menuToggle = page.getByRole('button', { name: /menu/i })
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false')
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true)
    await menuToggle.click()
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true')

    await page.getByRole('link', { name: 'Projects', exact: true }).click()
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#projects')).toBeInViewport()
  })

  test('reduced-motion visitors receive the static hero', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('/')

    await expect(page.locator('[data-hero-visual="static"]')).toBeVisible()
    await expect(page.locator('[data-hero-visual="webgl"]')).toHaveCount(0)
    await expect(page.locator('#hero canvas')).toHaveCount(0)

    await context.close()
  })
})
