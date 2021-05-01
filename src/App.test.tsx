import { render } from '@testing-library/react'
import React from 'react'
import App from './App'

beforeAll(() => {
    // This prevents: "Error: For security reasons, `window.crypto` is required to run `auth0-spa-js`."
    // Reference: https://stackoverflow.com/a/60370536/7571132
    Object.assign(window, { crypto: { subtle: {} } })
})

test('renders learn react link', async () => {
    const { findByText } = render(<App />)
    const linkElement = await findByText(/welcome to moodful/i)
    expect(linkElement).toBeInTheDocument()
})
