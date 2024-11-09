import { useState } from 'react'
import blogService from '../services/blogService'

export default function Welcome({ user, blogs, isloading, handleLogout, loginVisible, setLoginVisible }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [message, setMessage] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (e) => {
    e.preventDefault()
    console.log('Title:', title)
    console.log('Author:', author)
    console.log('URL:', url)

    const newBlog = { title, author, url }
    const response = await blogService.createPost(newBlog)
    if (response.error) {
      return setMessage(response.error)
    }
    setMessage('A new Blog by ' + response.author + ' was just added')
  }
  return (
    <div>
      <h2>{user && `Hola ${user.username}`} </h2>
      <button onClick={()=> setLoginVisible(!loginVisible)}>{loginVisible ? 'cancel' : 'login'}</button>
      {/* <button onClick={handleLogout}>Logout</button> */}
      {isloading ? (
        <p>Loading... please wait</p>
      ) : blogs && blogs.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' , gap:10, marginTop:'20px'}}>
          {blogs.map((b) => (
            <div key={b.id}>
              <p style={{display:'inline'}}>
                Author: {b.author} Title: {b.title} Likes: {b.likes} URL: {b.url}
              </p>
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
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}
