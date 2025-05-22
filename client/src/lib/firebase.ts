import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Sign in with Google using popup
export const signInWithGoogle = async () => {
  try {
    console.log("Starting Google sign-in process");
    // Using popup is more reliable in development environments
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Sign-in successful:", result.user);
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Handle redirect result (if using signInWithRedirect)
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("Redirect result:", result.user);
    }
    return result;
  } catch (error) {
    console.error("Error handling redirect:", error);
    throw error;
  }
};

// Sign out function
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Signed out successfully");
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
};

// Check if user is already authenticated
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};