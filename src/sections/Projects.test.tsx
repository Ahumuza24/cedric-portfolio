import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { projects } from '@/lib/data'
import Projects from './Projects'

describe('Projects', () => {
  it('selects a project with a pointer and updates the detail panel', async () => {
    const user = userEvent.setup()
    render(<Projects />)

    const selector = screen.getByRole('tablist', { name: /project/i })
    const target = within(selector).getByRole('tab', {
      name: projects[1].title,
    })

    await user.click(target)

    expect(target).toHaveAttribute('aria-selected', 'true')
    const details = screen.getByRole('region', { name: /project details/i })
    expect(details).toHaveTextContent(projects[1].description)
    expect(within(details).getByText('Firebase')).toBeVisible()
  })

  it('supports arrow-key project selection without leaving the tablist', async () => {
    const user = userEvent.setup()
    render(<Projects />)

    const first = screen.getByRole('tab', { name: projects[0].title })
    const second = screen.getByRole('tab', { name: projects[1].title })

    first.focus()
    await user.keyboard('{ArrowRight}')

    expect(second).toHaveFocus()
    expect(second).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('region', { name: /project details/i })).toHaveTextContent(
      projects[1].description,
    )
  })

  it('wraps project focus and supports Home and End keys', async () => {
    const user = userEvent.setup()
    render(<Projects />)

    const first = screen.getByRole('tab', { name: projects[0].title })
    const last = screen.getByRole('tab', { name: projects[projects.length - 1].title })

    first.focus()
    await user.keyboard('{ArrowLeft}')
    expect(last).toHaveFocus()
    expect(last).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{Home}')
    expect(first).toHaveFocus()

    await user.keyboard('{End}')
    expect(last).toHaveFocus()

    await user.keyboard('x')
    expect(last).toHaveFocus()
  })
})
