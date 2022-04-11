// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore" 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6FRQNUZ-9PzDm9_uVrkFk-L38QkGO08M",
  authDomain: "firesvelte-ee3e4.firebaseapp.com",
  projectId: "firesvelte-ee3e4",
  storageBucket: "firesvelte-ee3e4.appspot.com",
  messagingSenderId: "251945771712",
  appId: "1:251945771712:web:7048713f9e356273ca0325"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)