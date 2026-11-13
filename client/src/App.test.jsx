import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

describe('test infrastructure', () => {
  it('renders App without crashing', () => {
    const { container } = render(<App />)
    expect(container).not.toBeEmptyDOMElement()
  })
})