import { useState } from 'react'
import blogService from '../services/blogService'

export default function Welcome({ user, blogs, setBlogs, isloading, handleLogout }) {
  const [error, setError] = useState(null)
  const handleLike = async(blogId)=>{

    const blogToUpdate = blogs.find(b=> b.id=== blogId)
    blogService.putLike({...blogToUpdate, user: blogToUpdate.user.id, likes:1})
    .then(response=> {
      if(response.error){
        return setError(`Error: ${response.error}: ${response.message}`)
      }
      setBlogs(prevBlogs=> prevBlogs.map(b=> b.id !== blogId ? b : response) )
    })
    .catch(error => console.log(error))
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
        <h3>{error&& <p style={{color:'red'}}>{error}</p> }</h3>
      </div>
      {isloading ? (
        <p>Loading... please wait</p>
      ) : blogs && blogs.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            marginTop: '20px',
          }}
        >
          {blogs.map((b) => (
            <Card key={b.id} {...b} sendLike={()=>handleLike((b.id))}/>
          ))}
        </div>
      ) : (
        <p>No blogs to show yet</p>
      )}
    </div>
  )
}

const Card = ({ author, likes, title, url, sendLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div>
      <p style={{ display: 'inline' }}>Title: {title}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show details'}
      </button>
      {showDetails && (
        <div>
          <p>URL: {url} </p>
          <p>
            Likes: {likes} <button onClick={sendLike}>Like</button>
          </p>
          <p>Author: {author}</p>
        </div>
      )}
    </div>
  )
}
