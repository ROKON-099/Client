import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

// ============================
// AUTH CONTEXT
// ============================
export const AuthContext = createContext(null);

// ============================
// AUTH PROVIDER
// ============================
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // REGISTER (Email & Password)
  // ----------------------------
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ----------------------------
  // LOGIN (Email & Password)
  // ----------------------------
  const loginUser = async (email, password) => {
  setLoading(true);
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } finally {
    setLoading(false);   
  }
};

  // ----------------------------
  // GOOGLE LOGIN
  // ----------------------------
  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ----------------------------
  // LOGOUT
  // ----------------------------
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ----------------------------
  // AUTH STATE OBSERVER
  // ----------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ----------------------------
  // CONTEXT VALUE (IMPORTANT FIX)
  // ----------------------------
  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    login: loginUser,     
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
