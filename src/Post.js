import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import "./Post.css";

function Post({ username, imageUrl, caption }) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="waleoxy"
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            {/*header- has an avatar, userbane*/}
            <img
                className="post__image"
                src={imageUrl}
                alt="logo"
            />
            <h4 className="post__text"><strong>{username}</strong>: {caption} </h4>
        </div>
    )
}

export default Post
