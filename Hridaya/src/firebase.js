// // Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ ADD THIS: Firestore
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbBXxJHqJ3njyUF4blVLaaccnXTD8CRWA",
  authDomain: "hospital-ce052.firebaseapp.com",
  projectId: "hospital-ce052",
  storageBucket: "hospital-ce052.appspot.com",
  messagingSenderId: "736144274507",
  appId: "1:736144274507:web:629fe8069ae183c8e3c9ce",
  measurementId: "G-7CBYX8QVJ3"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Setup Firebase Auth
const auth = getAuth(app);

// ✅ Google Provider for Sign-In with Google
const googleProvider = new GoogleAuthProvider();

// ✅ ADD THIS: Initialize and export Firestore DB
const db = getFirestore(app);

// ✅ Export everything
export { auth, googleProvider, db };
