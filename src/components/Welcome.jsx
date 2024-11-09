import { useState } from 'react'
import blogService from '../services/blogService'

export default function Welcome({ user, blogs, isloading, handleLogout, loginVisible, setLoginVisible }) {

  return (
    <div>
      <h2>{user && `Hola ${user.username}`} </h2>
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
    </div>
  )
}
