import { useEffect, useRef, useState } from 'react'
import loginService from './services/loginService'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import Welcome from './components/Welcome'
import Toggable from './components/Toggable'
import NewBlogForm from './components/NewBlogForm'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [isloading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const blogFormRef = useRef() 
  const loginFormRef = useRef()

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedUser')
    if (storedUser) {
      const userLogged = JSON.parse(storedUser)
      setUser(userLogged)
      blogService.setToken(userLogged.token)
    }

    const fetchBlogs = async () => {
      try {
        const blogsData = await blogService.getAll()
        setBlogs(blogsData)
        setIsLoading(false)
      } catch (error) {
        setError('Failed to fetch blogs. Please try again later.')
        console.log(error) 
        setIsLoading(false) 
      }
    }
    fetchBlogs()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userResponse = await loginService.login({ username, password })
      if (userResponse.error) setError(userResponse.error)
      else {
        window.localStorage.setItem('loggedUser', JSON.stringify(userResponse))
        blogService.setToken(userResponse.token)
        loginFormRef.current.toggleVisibility()
        setUser(userResponse)
        setError(null)
        setPassword('')
        setUsername('')
      }
    } catch (error) {
      console.log(error)
      setError('An unexpected error occurred.')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const addNote =async noteObject =>{
      blogFormRef.current.toggleVisibility()
      const response = await blogService.createPost(noteObject)
      if (response.error) {
        return setMessage(response.error)
      }
      setMessage('A new Blog by ' + response.author + ' was just added')
  }
  return (
    <div>
      {user === null &&
      <Toggable user={user} ref={loginFormRef}>
      <LoginForm
        handleSubmit={handleSubmit}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        error={error}
      />
    </Toggable>}
      <Welcome
        user={user}
        blogs={blogs}
        isloading={isloading}
        handleLogout={handleLogout}
        loginVisible={loginVisible}
        setLoginVisible={setLoginVisible}
      />
      <Toggable labelText = {'Post New Blog'} ref={blogFormRef}>
        <NewBlogForm createNote={addNote} message={message}/>
      </Toggable>
      {user !== null && error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* {user === null && (
        <LoginForm
          handleSubmit={handleSubmit}
          setUsername={setUsername}
          setPassword={setPassword}
          error={error}
        />
      )} */}

    </div>
  )
}

export default App
