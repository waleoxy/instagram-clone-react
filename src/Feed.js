import React, { useState } from 'react'
import "./Feed.css"

const Feed = (props) => {

    const [id, setid] = useState("17846025622181169")
    const [media_url, setmedial_url] = useState("https://scontent.cdninstagram.com/v/t51.2885-15/15623810_1612221635753893_3436686758421463040_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=m7MITX5QeVEAX8R7UFW&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=1c365303f3bbdcf564e460b121f96d5c&oe=61204708")
    const [permalink, setpermalink] = useState("https://www.instagram.com/p/BOerB4TBzYt/")
    const [caption, setxaption] = useState('')

    let post;
    post = (
        <section className="post__section">
            <img
                width='auto'
                height='auto'
                id={id}
                src={media_url}
                alt={caption}
            />
            <div className="comment">
                <img
                    className="profile__image"
                    src="https://image.flaticon.com/icons/png/512/3237/3237472.png" />
                <p>olawaleotubu</p>
                <span><img src="https://thenounproject.com/term/ellipsis/93425" />
                </span>

            </div>

        </section>
    );

    return (
        <React.Fragment>
            {post}
        </React.Fragment>
    )
}

export default Feed
