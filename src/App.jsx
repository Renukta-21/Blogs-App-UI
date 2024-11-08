import { useEffect, useState } from 'react'
import loginService from './services/loginService'
import blogService from './services/blogService'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const userLogged = window.localStorage.getItem('loggedUser')
    if(userLogged) setUser(JSON.parse(userLogged))

    blogService.getAll().then(blogs=> {setBlogs(blogs)})
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userResponse = await loginService.login({ username, password })
      if (userResponse.error) setError(userResponse.error)
      else {
        window.localStorage.setItem('loggedUser', JSON.stringify(userResponse))
        setUser(userResponse)
        setPassword('')
        setUsername('')
      }
    } catch (error) {
      console.log(error)
    }
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
      {user && <Welcome user={user} blogs={blogs}/>}
    </div>
  )
}

function Welcome({ user, blogs }) {
  return (
    <div>
      <h2>Hola {user.username}</h2>
      <div>
      {blogs ?
       <div style={{display:'flex', flexWrap:'wrap'}}>{blogs.map(b=>(
          <div key={b.id} style={{flex:'1 1 400px', backgroundColor:'red', margin: '10px 10px', padding:'10px'}}>
            <hr />
            <p>Author: {b.author}</p>
            <p>Title: {b.title}</p>
            <p>Likes: {b.likes}</p>
            <small>URL: {b.url}</small>
          </div>
       ))}</div>
      :<p>No blogs to show yet</p>}
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
