import { screen, render } from '@testing-library/react'
import Welcome, { Card } from './Welcome'
import userEvent from '@testing-library/user-event'

const blogs = [
  {
    id: '1',
    title: 'El hombre que dejó de soñar',
    author: 'Daniel U',
    url: 'http:27y217ehdsds',
    likes: 20,
    user: { username: 'testuser' },
  },
]

test('should display the blog title', () => {
  render(
    <Welcome blogs={blogs} user={{ username: 'testuser' }} isloading={false} />
  )
  const titleElement = screen.getByText(/El hombre que dejó de soñar/)
  const authorElement = screen.queryByText(/Daniel/)

  const urlElement = screen.queryByText(/http:\/\/27y217ehdsds/)
  expect(urlElement).not.toBeInTheDocument()

  const likesElement = screen.queryByText(/20/)
  expect(likesElement).not.toBeInTheDocument()
})

test('should display the URL and likes after clicking the button', async () => {

  render(
    <Welcome blogs={blogs} user={{ username: 'testuser' }} isloading={false} />
  )
  const urlElement = screen.queryByText(/http:27y217ehdsds/)
  const likesElement = screen.queryByText(/20/)
  expect(urlElement).not.toBeInTheDocument()
  expect(likesElement).not.toBeInTheDocument()

  const user = userEvent.setup()
  const button = screen.getByText('Show details')
  await user.click(button)

  const urlElementAfterClick = screen.getByText(/URL:/)
  const likesElementAfterClick = screen.getByText(/Likes:/)
  expect(urlElementAfterClick).toBeInTheDocument()
  expect(likesElementAfterClick).toBeInTheDocument()


})

test('Double like button clicked is runned twice', async () => {
  const likeMockup = vi.fn()
  const user = userEvent.setup()
  const container =
    render(<Card user={blogs[0].user} sendLike={likeMockup} />)
      .container

  const showDetailsButton = screen.getByText('Show details')
  await user.click(showDetailsButton)

  const likeButton = screen.getByTestId('likeButton')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeMockup.mock.calls).toHaveLength(2)
})
