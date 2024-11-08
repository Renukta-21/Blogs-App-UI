import { useState } from 'react'
import loginService from './services/loginService'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userResponse = await loginService.login({ username, password })
      if (userResponse.error) setError(userResponse.error)
      else {
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
      {user&& 
      <h2>Welcome back, {user.username}</h2> }
    </div>
  )
}

function Welcome({ user }) {
  return <h2>Hola {user.username}</h2>
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
      {error && <p style={{color:'red'}}>Error: {error}</p>}
    </form>
  )
}
export default App
