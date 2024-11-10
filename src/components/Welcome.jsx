import { useState } from 'react'

export default function Welcome({ user, blogs, isloading, handleLogout }) {
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
            <Card key={b.id} {...b} />
          ))}
        </div>
      ) : (
        <p>No blogs to show yet</p>
      )}
    </div>
  )
}

const Card = ({ author, likes, title, url }) => {
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
            Likes: {likes} <button>Like</button>
          </p>
          <p>Author: {author}</p>
        </div>
      )}
    </div>
  )
}
