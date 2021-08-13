import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBM_SQJc5rvU_wDcqfUphHSJCveF3_eDZI",
    authDomain: "instagram-clone-89e12.firebaseapp.com",
    projectId: "instagram-clone-89e12",
    storageBucket: "instagram-clone-89e12.appspot.com",
    messagingSenderId: "279672380450",
    appId: "1:279672380450:web:48f63514fdaee8f7d3be7b",
    measurementId: "G-X635MHTQLR"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

