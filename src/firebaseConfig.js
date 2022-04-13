// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcQAAd_B8avQF4qYs9Lc0Qp8ydQ4_jLeQ",
  authDomain: "ema-john-shopping-cc6f7.firebaseapp.com",
  projectId: "ema-john-shopping-cc6f7",
  storageBucket: "ema-john-shopping-cc6f7.appspot.com",
  messagingSenderId: "319063341466",
  appId: "1:319063341466:web:f73e9976055910d3cce223"
};

// Initialize Firebase
const auth =getAuth(initializeApp(firebaseConfig)) 
export default auth;