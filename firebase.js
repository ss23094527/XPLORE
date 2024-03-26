// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0-zoZqLg8dTlKHDPZU8xaAHZj8rrIc8U",
  authDomain: "xplore-72e89.firebaseapp.com",
  projectId: "xplore-72e89",
  storageBucket: "xplore-72e89.appspot.com",
  messagingSenderId: "739573469399",
  appId: "1:739573469399:web:4416db9d9f7fd00dc3e092",
  measurementId: "G-9RSPW9RDK6"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp, "gs://xplore-72e89.appspot.com");


export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,db, storage};
