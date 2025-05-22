import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  signInWithRedirect,
  GoogleAuthProvider, 
  signOut,
  getRedirectResult,
  onAuthStateChanged,
  User
} from "firebase/auth";

// This environment file requires the following Firebase config variables:
// VITE_FIREBASE_API_KEY - Your Firebase API key
// VITE_FIREBASE_PROJECT_ID - Your Firebase project ID
// VITE_FIREBASE_APP_ID - Your Firebase app ID
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Configure Google Auth Provider with custom parameters
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Sign in with Google using popup
 * @returns User object if sign in is successful
 */
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    console.log("Starting Google sign-in process");
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Sign-in successful");
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null;
  }
};

/**
 * Sign out the current user
 * @returns true if sign out is successful, false otherwise
 */
export const signOutUser = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    console.log("Sign-out successful");
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
};

/**
 * Get the current authenticated user
 * @returns Promise that resolves to the current user or null if not authenticated
 */
export const getCurrentUser = (): Promise<User | null> => {
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