import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Skills from './Skills'

describe('Skills', () => {
  it('starts with every skill category visible', () => {
    render(<Skills />)

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('heading', { name: 'Backend' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Frontend' })).toBeVisible()
  })

  it('filters the skill system to the selected category', async () => {
    const user = userEvent.setup()
    render(<Skills />)

    const backendFilter = screen.getByRole('button', { name: 'Backend' })
    await user.click(backendFilter)

    expect(backendFilter).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Python')).toBeVisible()
    expect(screen.queryByText('React JS')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'All' }))
    expect(screen.getByText('React JS')).toBeVisible()
  })
})
