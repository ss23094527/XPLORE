// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged   } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const getCurrentUser = () => {
  const auth = getAuth();
  const db = getFirestore();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
      
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', user.uid)); // 將這裡的 'userId' 改為 'uid'
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userData = {
            username: doc.data().username,
            email: user.email,
          
          };
          resolve(userData);
        });
      } else {
        reject(new Error('No user logged in'));
      }
    });
  });
};

export { getCurrentUser };


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

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, storage };
