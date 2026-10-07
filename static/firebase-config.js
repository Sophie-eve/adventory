// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB7pBKY3iJdU8khLaPpyqT5mJc-RdOZjA",
  authDomain: "stock-inventory-74f6d.firebaseapp.com",
  projectId: "stock-inventory-74f6d",
  storageBucket: "stock-inventory-74f6d.firebasestorage.app",
  messagingSenderId: "35199308821",
  appId: "1:35199308821:web:88b5a30d499955abad6a1c",
  measurementId: "G-K2DWELVT38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // Analytics might not run on non-HTTPS local dev
}
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signInWithPopup };
