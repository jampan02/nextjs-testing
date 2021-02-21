import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage, initTestHelpers } from 'next-page-tester'

initTestHelpers()

describe('navivgation by link', () => {
  it('should route to sekected page in vnav bar', async () => {
    //ルートの取得方法
    const { page } = await getPage({
      route: '/index',
    })

    render(page)
    screen.debug()
    userEvent.click(screen.getByTestId('blog-nav'))

    expect(await screen.findByText('blog page')).toBeInTheDocument()
    screen.debug()
    //コメントページ見れるかチェック
    userEvent.click(screen.getByTestId('comment-nav'))

    expect(await screen.findByText('comment page')).toBeInTheDocument()
    //context
    userEvent.click(screen.getByTestId('context-nav'))

    expect(await screen.findByText('context page')).toBeInTheDocument()
    //task
    userEvent.click(screen.getByTestId('task-nav'))

    expect(await screen.findByText('todos page')).toBeInTheDocument()
    //index(home)にもどる
    userEvent.click(screen.getByTestId('home-nav'))

    expect(await screen.findByText('Welcome to Nextjs')).toBeInTheDocument()
  })
})
