export default function Welcome({ user, blogs, isloading }) {
  return (
    <div>
      <h2>{user && `Hola ${user.username}`} </h2>
      {/* <button onClick={handleLogout}>Logout</button> */}
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

const Card = ({ author, likes, title, url }) => (
  <div>
    <p style={{ display: 'inline' }}>
      Author: {author} Title: {title} Likes: {likes} URL: {url}
    </p>
  </div>
)
