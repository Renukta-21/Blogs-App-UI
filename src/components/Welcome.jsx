import { useState } from "react"
import blogService from "../services/blogService"

export default function Welcome({ user, blogs, isloading, handleLogout }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [message, setMessage] = useState('')
    const [url, setUrl] = useState('')
  
    const handleNewBlog = async(e) => {
      e.preventDefault()
      console.log('Title:', title)
      console.log('Author:', author)
      console.log('URL:', url)
  
      const newBlog = { title, author, url }
      const response = await blogService.createPost(newBlog)
      if(response.error) {
        return setMessage(response.error)
      }
      setMessage('A new Blog by '+ response.author + ' was just added')
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
          {message && <p>{message}</p> }
        </div>
      </div>
    )
  }
  