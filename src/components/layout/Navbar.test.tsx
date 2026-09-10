import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('opens and closes the mobile navigation with an accessible control', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const toggle = screen.getByRole('button', { name: /menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls')

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const menuId = toggle.getAttribute('aria-controls')
    expect(document.getElementById(menuId!)).toBeVisible()

    const mobileMenu = document.getElementById(menuId!)!
    await user.click(withinMenu(mobileMenu, 'Projects'))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('marks the current section for assistive technology', () => {
    render(<Navbar />)

    const currentLinks = screen.getAllByRole('link', { current: 'page' })
    expect(currentLinks.some((link) => link.getAttribute('href') === '#hero')).toBe(
      true,
    )
  })

  it('closes the mobile navigation with Escape', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const toggle = screen.getByRole('button', { name: /menu/i })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})

function withinMenu(menu: HTMLElement, linkName: string) {
  const link = Array.from(menu.querySelectorAll('a')).find(
    (candidate) => candidate.textContent?.trim() === linkName,
  )

  if (!link) throw new Error(`Could not find ${linkName} link in the mobile menu`)
  return link
}
