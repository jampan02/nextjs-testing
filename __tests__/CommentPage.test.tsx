import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage, initTestHelpers } from 'next-page-tester'
import { SWRConfig, cache } from 'swr'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import CommentPage from '../pages/comment-page'

const server = setupServer(
  rest.get(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            userId: 1,
            id: 1,
            name: 'A',
            title: 'dummya@gmail.com',
            body: 'test body a',
          },
          {
            userId: 2,
            id: 2,
            name: 'B',
            title: 'dummyb@gmail.com',
            body: 'test body b',
          },
        ])
      )
    }
  )
)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  cleanup()
  //cache.clear()
})

afterAll(() => server.close())

describe('comment page with useSSEW / success or error', () => {
  it('should render the value fetched by useSRW', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage />
      </SWRConfig>
    )
    expect(await screen.findByText('1: test body a')).toBeInTheDocument()
    expect(screen.getByText('2: test body b')).toBeInTheDocument()
  }),
    it('should rende rerror text when fetrch failed', async () => {
      server.use(
        rest.get(
          'https://jsonplaceholder.typicode.com/comments/?_limit=10',
          (req, res, ctx) => {
            return res(ctx.status(400))
          }
        )
      )
      render(
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <CommentPage />
        </SWRConfig>
      )
      expect(await screen.findByText('Error')).toBeInTheDocument()
      screen.debug()
    })
})
