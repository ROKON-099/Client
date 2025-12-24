import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtAd51SncqtCCVk7K_JZdC4yOVfqvDMnw",
  authDomain: "vehicles-project-d774b.firebaseapp.com",
  projectId: "vehicles-project-d774b",
  storageBucket: "vehicles-project-d774b.appspot.com", 
  appId: "1:1072911985978:web:273f5f3b9ffda4be817403",
};

// Initialize Firebase (ONLY ONCE)
const app = initializeApp(firebaseConfig);

// Export auth and googleProvider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
