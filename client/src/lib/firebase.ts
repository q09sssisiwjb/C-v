// Firebase authentication configuration - based on blueprint:firebase_barebones_javascript
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC-viPmWu72e1FFmRV7rjFH-4VKbIEluJA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "creativista-auth.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://creativista-auth-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "creativista-auth",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "creativista-auth.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "399018880799",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:399018880799:web:1306a01aa530f48ffdca2a",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-D1TCK21Z40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Google provider
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signUpWithEmailAndPassword = async (email: string, password: string, username: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
    displayName: username,
  });
  return userCredential.user;
};

export const signInWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logOut = async () => {
  await signOut(auth);
};

// Google authentication functions
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const signUpWithGoogle = async () => {
  // For Google authentication, signup and signin are the same process
  return signInWithGoogle();
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};