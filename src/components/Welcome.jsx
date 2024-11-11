import { useState } from 'react'
import blogService from '../services/blogService'

export default function Welcome({
  user,
  blogs,
  setBlogs,
  isloading,
  handleLogout,
  sortBlogsByLikes,
}) {
  const [error, setError] = useState(null)

  const handleLike = async (blogId) => {
    const blogToUpdate = blogs.find((b) => b.id === blogId)
    blogService
      .putLike({
        ...blogToUpdate,
        user: blogToUpdate.user.id,
        likes: blogToUpdate.likes + 1,
      })
      .then((response) => {
        if (response.error) {
          return setError(`Error: ${response.error}: ${response.message}`)
        }
        setBlogs((prevBlogs) =>
          sortBlogsByLikes(
            prevBlogs.map((b) => (b.id !== blogId ? b : response))
          )
        )
      })
      .catch((error) => console.log(error))
  }

  const handleDeleteBlog = (blogId) => {
    const isConfirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar este blog?'
    )
    if (isConfirmed) {
      const blogToDelete = blogs.find((b) => b.id === blogId)

      setBlogs((prevBlogs) =>
        sortBlogsByLikes(prevBlogs.filter((b) => b.id !== blogId))
      )
      try {
        blogService.deleteBlog(blogId)
      } catch (error) {
        setBlogs((prevBlogs) =>
          sortBlogsByLikes(prevBlogs.concat(blogToDelete))
        )
        console.error(error)
        setError(error.message)
      }
    }
  }
  return (
    <div>
      <div>
        {user && (
          <>
            <h2>
              Bienvenido de nuevo --- <b>{user.username}</b>
            </h2>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        <h3>{error && <p style={{ color: 'red' }}>{error}</p>}</h3>
      </div>
      {isloading ? (
        <p>Loading... please wait</p>
      ) : blogs && blogs.length > 0 ? (
        <div
          style={{
            marginTop: '10px',
          }}
        >
          {blogs.map((b) => (
            <Card
              key={b.id}
              {...b}
              sendLike={() => handleLike(b.id)}
              sendDelete={() => handleDeleteBlog(b.id)}
              currentUser={user}
            />
          ))}
        </div>
      ) : (
        <p>No blogs to show yet</p>
      )}
    </div>
  )
}

const Card = ({
  author,
  likes,
  title,
  url,
  sendLike,
  user,
  currentUser,
  sendDelete,
}) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='blogCard'>
      <div style={{ display: 'flex' }}>
        <p>Title: {title}</p>
        <p>Author: {author}</p>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'Show details'}
        </button>
        {currentUser?.username === user.username && (
          <button style={{ marginLeft: '10px' }} onClick={sendDelete}>
            Delete Blog
          </button>
        )}
      </div>
      {showDetails && (
        <div>
          <p>URL: {url} </p>
          <p>
            Likes: {likes} <button onClick={sendLike}>Like</button>
          </p>
        </div>
      )}
      <hr />
    </div>
  )
}
