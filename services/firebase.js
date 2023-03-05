// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZFqAm2rqK-5myUQIwxGf-gg0-ZDHDu8M",
    authDomain: "plain-rank.firebaseapp.com",
    projectId: "plain-rank",
    storageBucket: "plain-rank.appspot.com",
    messagingSenderId: "201240174022",
    appId: "1:201240174022:web:92baf4b157ffcca06466c7",
    measurementId: "G-BVCZCP2QKK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);