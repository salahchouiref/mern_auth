// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernauth-70bea.firebaseapp.com",
  projectId: "mernauth-70bea",
  storageBucket: "mernauth-70bea.appspot.com",
  messagingSenderId: "743604801313",
  appId: "1:743604801313:web:4e1d89e5f55c9a3db7b860"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);