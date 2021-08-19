import React, { useEffect, useState } from 'react';
import axios from "axios";
import Feed from './Feed';


const InstagramFeeds = ({ token, ...props }) => {
    const [feeds, setFeeds] = useState([]);
    useEffect(() => {
        const abortController = new AbortController();

        async function fetchInstagramFeed() {
            try {
                var url = "https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url&&access_token=IGQVJXWkV5aUZAmNlpXeHNIUHJINzV3Nl85cTZAMSHhTRjNDZA1NMRHpOREIta2hkMzdSelFscGRsRG9hX2k5dWdkaFpsTEY3U0h6bC1GS2tnM0NoQldFdTZA0cFpiYTNIcnRCVXF5S1RUN2hienJrOWlpWgZDZD";
                fetch(url).then((response) => {
                    return response.json();
                }).then((data) => {
                    setFeeds(data.data)
                })

            }

            catch (err) {
                console.log('error', err)
            }
        }
        fetchInstagramFeed();
        return () => {
            abortController.abort();
        }

    }, [])
    let count = 2;

    console.log("my feed", feeds[count]);

    return (
        <div>
            <Feed feed={feeds[count]} />
        </div>
    )
}

export default InstagramFeeds
