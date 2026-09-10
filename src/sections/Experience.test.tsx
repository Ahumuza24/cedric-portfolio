import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { experience } from '@/lib/data'
import Experience from './Experience'

describe('Experience', () => {
  it('exposes each career entry as an accessible disclosure', async () => {
    const user = userEvent.setup()
    render(<Experience />)

    const disclosure = screen.getByRole('button', {
      name: new RegExp(experience[2].company, 'i'),
    })

    expect(disclosure).toHaveAttribute('aria-expanded', 'false')
    expect(disclosure).toHaveAttribute('aria-controls')

    await user.click(disclosure)

    expect(disclosure).toHaveAttribute('aria-expanded', 'true')
    const panelId = disclosure.getAttribute('aria-controls')
    expect(panelId).toBeTruthy()
    expect(document.getElementById(panelId!)).toHaveTextContent(
      experience[2].bullets[0],
    )
  })

  it('collapses an open career entry from the keyboard', async () => {
    const user = userEvent.setup()
    render(<Experience />)

    const disclosure = screen.getByRole('button', {
      name: new RegExp(experience[0].company, 'i'),
    })
    disclosure.focus()
    await user.keyboard('{Enter}')

    expect(disclosure).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(experience[0].bullets[0])).not.toBeInTheDocument()
  })
})
