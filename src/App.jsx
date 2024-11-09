import { useEffect, useState } from 'react'
import loginService from './services/loginService'
import blogService from './services/blogService'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedUser')
    if (storedUser) {
      const userLogged = JSON.parse(storedUser)
      setUser(userLogged)
      blogService.setToken(userLogged.token)
    }

    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
      setIsLoading(false)
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userResponse = await loginService.login({ username, password })
      if (userResponse.error) setError(userResponse.error)
      else {
        window.localStorage.setItem('loggedUser', JSON.stringify(userResponse))
        blogService.setToken(userResponse.token)
        setUser(userResponse)
        setPassword('')
        setUsername('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div>
      <h2>Login to App</h2>
      {user === null && (
        <LoginForm
          handleSubmit={handleSubmit}
          setUsername={setUsername}
          setPassword={setPassword}
          error={error}
        />
      )}
      {user && (
        <Welcome
          user={user}
          blogs={blogs}
          isloading={isloading}
          handleLogout={handleLogout}
        />
      )}
    </div>
  )
}

function Welcome({ user, blogs, isloading, handleLogout }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async(e) => {
    e.preventDefault()
    console.log('Title:', title)
    console.log('Author:', author)
    console.log('URL:', url)

    const newBlog = { title, author, url }
    const response = await blogService.createPost(newBlog)
    console.log(response)
  }
  return (
    <div>
      <h2>Hola {user.username}</h2>
      <button onClick={handleLogout}>Logout</button>
      {isloading ? (
        <p>Loading... please wait</p>
      ) : blogs && blogs.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {blogs.map((b) => (
            <div
              key={b.id}
              style={{
                flex: '1 1 400px',
                backgroundColor: 'red',
                margin: '10px 10px',
                padding: '10px',
              }}
            >
              <hr />
              <p>Author: {b.author}</p>
              <p>Title: {b.title}</p>
              <p>Likes: {b.likes}</p>
              <small>URL: {b.url}</small>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs to show yet</p>
      )}
      <div>
        <h2>Add new Blog</h2>
        <form onSubmit={handleNewBlog}>
          <label htmlFor="titleField">Title </label>
          <input
            type="text"
            id="titleField"
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          <br />
          <label htmlFor="authorField">Author </label>
          <input
            type="text"
            id="authorField"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          <br />
          <label htmlFor="urlField">URL </label>
          <input
            type="text"
            id="urlField"
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />
          <br />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}
function LoginForm({ handleSubmit, setUsername, setPassword, error }) {
  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="usernameField">Username </label>
      <input
        type="text"
        id="usernameField"
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <br />
      <label htmlFor="passwordField">Password </label>
      <input
        type="text"
        id="passwordField"
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <br />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </form>
  )
}
export default App
