import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import Contact from './Contact'

vi.mock('@emailjs/browser', () => ({
  default: {
    sendForm: vi.fn(),
  },
}))

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

const sendForm = vi.mocked(emailjs.sendForm)
const toastError = vi.mocked(toast.error)

describe('Contact', () => {
  it('associates every contact field with its visible label', () => {
    render(<Contact />)

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeInTheDocument()
  })

  it('shows accessible validation errors and never submits an empty form', () => {
    render(<Contact />)

    fireEvent.submit(screen.getByRole('form', { name: /contact/i }))

    expect(screen.getAllByRole('alert')).toHaveLength(3)
    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Message is required')).toBeInTheDocument()
    expect(sendForm).not.toHaveBeenCalled()
  })

  it('rejects malformed email addresses before EmailJS is called', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Ada Lovelace')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'not-an-email')
    await user.type(
      screen.getByRole('textbox', { name: 'Message' }),
      'I would like to discuss a project.',
    )
    fireEvent.submit(screen.getByRole('form', { name: /contact/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email')
    expect(sendForm).not.toHaveBeenCalled()
  })

  it('submits valid values through the mocked EmailJS boundary', async () => {
    const user = userEvent.setup()
    sendForm.mockResolvedValueOnce({ status: 200, text: 'OK' })
    render(<Contact />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Ada Lovelace')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'ada@example.com')
    await user.type(
      screen.getByRole('textbox', { name: 'Message' }),
      'I would like to discuss a project.',
    )
    fireEvent.submit(screen.getByRole('form', { name: /contact/i }))

    await waitFor(() => expect(sendForm).toHaveBeenCalledOnce())
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('')
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveValue('')
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('')
  })

  it('enforces field length boundaries', () => {
    render(<Contact />)

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'A'.repeat(101) },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: `${'a'.repeat(250)}@example.com` },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
      target: { value: 'M'.repeat(2001) },
    })
    fireEvent.submit(screen.getByRole('form', { name: /contact/i }))

    expect(screen.getByText(/100 characters/i)).toBeInTheDocument()
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
    expect(screen.getByText(/2,000 characters/i)).toBeInTheDocument()
    expect(sendForm).not.toHaveBeenCalled()
  })

  it('reports a generic message when EmailJS rejects the request', async () => {
    const user = userEvent.setup()
    sendForm.mockRejectedValueOnce(new Error('provider detail'))
    render(<Contact />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Ada Lovelace')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'ada@example.com')
    await user.type(screen.getByRole('textbox', { name: 'Message' }), 'Project inquiry')
    fireEvent.submit(screen.getByRole('form', { name: /contact/i }))

    await waitFor(() => expect(toastError).toHaveBeenCalledWith(
      'The signal dropped. Please email me directly.',
      { duration: 5000 },
    ))
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('Ada Lovelace')
  })
})
