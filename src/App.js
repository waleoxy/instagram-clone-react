import { Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react"
import './App.css';
import { auth, db } from "./firebase";
import ImageUpload from "./ImageUpload";
import Post from "./Post";
import InstagramFeed from 'react-ig-feed'
import 'react-ig-feed/dist/index.css'
import InstagramEmbed from 'react-instagram-embed';
import InstagramFeeds from "./InstagramFeeds";
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Avatar from '@material-ui/core/Avatar';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null)
      }
    })
    return () => {
      unsubscribe();
    }

  }, [user, username])

  const signUp = (event) => {
    event.preventDefault(event);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error => alert(error.message)));
    setOpen(false);
  }

  const userInputHandler = (event) => {
    setUsername(event.target.value)
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));
    setOpenSignIn(false);

  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={(() => setOpen(false))}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="instagram logo"
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={userInputHandler}>
            </Input>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}>
            </Input>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}>
            </Input>
            <Button type="submit" onClick={signUp}>Sign Up</Button>

          </form>

        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={(() => setOpenSignIn(false))}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="instagram logo"
              />
            </center>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}>
            </Input>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}>
            </Input>
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>

        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram logo"
        />
        <div className="header__icons__log">
          <div className="header__icons">
            <HomeIcon className="icons" /> <SendIcon className="icons" /> <ExploreIcon className="icons" /> <FavoriteBorderOutlinedIcon className="icons" /> <Avatar className="icons" />
          </div>
          <div>
            {user ? (
              <Button onClick={() => auth.signOut()}>Logout</Button>
            ) : (
                <div className="app__Logincontainer" >
                  <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                  <Button onClick={() => setOpen(true)}>Sign Up</Button>
                </div>
              )}
          </div>
        </div>

      </div>
      <div className="app__posts">
        <div className="app__postsleft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              caption={post.caption}
              username={post.username}
              imageUrl={post.imageUrl}
            />)

          )}
        </div>
        {/*IGQVJXWkV5aUZAmNlpXeHNIUHJINzV3Nl85cTZAMSHhTRjNDZA1NMRHpOREIta2hkMzdSelFscGRsRG9hX2k5dWdkaFpsTEY3U0h6bC1GS2tnM0NoQldFdTZA0cFpiYTNIcnRCVXF5S1RUN2hienJrOWlpWgZDZD*/}
        <div className="app__postsright">
          <div className="app__postsright__in">
            <InstagramFeed
              token="IGQVJXWkV5aUZAmNlpXeHNIUHJINzV3Nl85cTZAMSHhTRjNDZA1NMRHpOREIta2hkMzdSelFscGRsRG9hX2k5dWdkaFpsTEY3U0h6bC1GS2tnM0NoQldFdTZA0cFpiYTNIcnRCVXF5S1RUN2hienJrOWlpWgZDZD"
              counter='5'
            />
            <InstagramFeeds>

            </InstagramFeeds>
          </div>
        </div>
      </div>


      {
        user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) : (
            <h3>Sorry you need to login to upload</h3>
          )
      }

    </div >
  )

}


export default App;
