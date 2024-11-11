import { screen, render } from '@testing-library/react'
import Welcome from './Welcome'
import { beforeEach } from 'vitest'
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

let container, blogCardElement
beforeEach(() => {
  container = render(
    <Welcome blogs={blogs} user={{ username: 'testuser' }} isloading={false} />
  ).container

  blogCardElement = container.querySelector('.blogCard')
  
})

test('should display the blog title', () => {
  const titleElement = screen.getByText(/El hombre que dejó de soñar/)
  expect(titleElement).toBeInTheDocument()

  const authorElement = screen.getByText(/Daniel U/)
  expect(authorElement).toBeInTheDocument()

  const urlElement = screen.queryByText(/http:\/\/27y217ehdsds/)
  expect(urlElement).not.toBeInTheDocument()

  const likesElement = screen.queryByText(/20/)
  expect(likesElement).not.toBeInTheDocument()
})

test('should display the URL and likes after clicking the button', async () => {
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

  screen.debug(blogCardElement)
})
