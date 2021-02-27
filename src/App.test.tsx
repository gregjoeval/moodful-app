import { render } from '@testing-library/react'
import React from 'react'
import App from './App'

test('renders learn react link', () => {
    Object.assign(window, { crypto: { subtle: {} } })
    const { getByText } = render(<App />)
    const linkElement = getByText(/welcome to moodful/i)
    expect(linkElement).toBeInTheDocument()
})
