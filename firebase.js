import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkrA11cQjDq6ip5Ipnf1pwdrWMPXHni9o",
  authDomain: "chat-up-52234.firebaseapp.com",
  projectId: "chat-up-52234",
  storageBucket: "chat-up-52234.appspot.com",
  messagingSenderId: "366767887282",
  appId: "1:366767887282:web:6fe1d59ec199d4c395caab",
  measurementId: "G-CKNG3VJB4K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

export { firebase, db, auth };
