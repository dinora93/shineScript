import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvUyIARTHeEMc-NUQ8XDU2S7OAJM7FGmA",
  authDomain: "bootcampapi-2f315.firebaseapp.com",
  projectId: "bootcampapi-2f315",
  storageBucket: "bootcampapi-2f315.firebasestorage.app",
  messagingSenderId: "832780964971",
  appId: "1:832780964971:web:52ba15465bc0b8967a4d2e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
