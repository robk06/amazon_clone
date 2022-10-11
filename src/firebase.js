import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCT97T9WQeIqhId78GmC-ijwShkHXv0z2M",
  authDomain: "clone-41420.firebaseapp.com",
  projectId: "clone-41420",
  storageBucket: "clone-41420.appspot.com",
  messagingSenderId: "744527732080",
  appId: "1:744527732080:web:ac437800e9aa3d50fd03b5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
