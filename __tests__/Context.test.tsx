import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage, initTestHelpers } from 'next-page-tester'
import { StateProvider } from '../context/StateProvider'
import ContextB from '../components/ContextB'
import ContextA from '../components/ContextA'

describe('global state maengimarne twifht usecontext', () => {
  it('should change the toggle state', () => {
    render(
      <StateProvider>
        <ContextA />
        <ContextB />
      </StateProvider>
    )
    expect(screen.getByTestId('toggle-a').textContent).toBe('false')
    expect(screen.getByTestId('toggle-b').textContent).toBe('false')
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByTestId('toggle-a').textContent).toBe('true')
    expect(screen.getByTestId('toggle-b').textContent).toBe('true')
  }),
    it('', () => {
      render(<ContextA />)
      screen.debug()
      //  かこまねーとできねー
      //userEvent.click(screen.getByRole('button'))
      // expect
    })
})
