// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJC8oklAn2Ot64HLIGcwoj7SHawC-BHbk",
  authDomain: "rokto-lagbe-55b7d.firebaseapp.com",
  projectId: "rokto-lagbe-55b7d",
  // ... baki config thakbe ekhane
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
