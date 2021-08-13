import { Button } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { db, storage } from './firebase';
import firebase from "firebase";
import "./imageUpload.css"

function ImageUpload({ username }) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)

    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_change",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * .100
                )
                setProgress(100);
            },
            (error) => {
                alert(error.message)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption('');
                        setImage(null);

                    })
            }

        )
    }


    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <input
                type="text"
                placeholder="Enter a caption ..."
                onChange={(event) => setCaption(event.target.value)}
                value={caption} />
            <input
                type="file"
                onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
                </Button>
        </div>
    )
}

export default ImageUpload
