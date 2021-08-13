import React, { useEffect, useState } from "react"
import './App.css';
import { db } from "./firebase";
import Post from "./Post";


function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])
  console.log("Po", posts);
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram logo"
        />
      </div>
      <h1>hello this is instagram clone</h1>
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          caption={post.caption}
          username={post.username}
          imageUrl={post.imageUrl}
        />)

      )}
    </div>
  )
}

export default App;
