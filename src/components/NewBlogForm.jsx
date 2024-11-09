import { useState } from 'react'

function NewBlogForm({ createNote, message }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    createNote({ title, author, url })
    setTitle('') 
    setAuthor('') 
    setUrl('') 
  }
  return (
    <div>
      <h2>Add new Blog</h2>
      <form
        onSubmit={handleSubmit}>
        <label htmlFor="titleField">Title </label>
        <input
          type="text"
          id="titleField"
          value={title}
          onChange={({ target }) => setTitle(target.value) }
        />
        <br />
        <br />
        <label htmlFor="authorField">Author </label>
        <input
          type="text"
          id="authorField"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <br />
        <label htmlFor="urlField">URL </label>
        <input
          type="text"
          id="urlField"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <br />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default NewBlogForm
