// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8D2XdTndFw59G2_ffq-AN586997FGL4A",
  authDomain: "rokto-lagbe-demo.firebaseapp.com",
  projectId: "rokto-lagbe-demo",
  storageBucket: "rokto-lagbe-demo.appspot.com",
  messagingSenderId: "62404458459",
  appId: "1:62404458459:web:bd0cccf18ce2b13b1bd9fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
