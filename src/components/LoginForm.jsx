export default function LoginForm({username, password, handleSubmit, setUsername, setPassword, error }) {
    return (

      <form action="" onSubmit={handleSubmit}>
        <h2>Login to App</h2>
        <label htmlFor="usernameField">Username </label>
        <input
          type="text"
          id="usernameField"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <br />
        <label htmlFor="passwordField">Password </label>
        <input
          type="text"
          id="passwordField"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <br />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </form>
    )
  }