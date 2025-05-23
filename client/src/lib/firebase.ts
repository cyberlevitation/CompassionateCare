import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile
} from "firebase/auth";

// Firebase configuration
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

/**
 * Sign up with email and password
 * @param email User's email
 * @param password User's password
 * @param displayName User's display name
 * @returns User object if sign up is successful
 */
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<User | null> => {
  try {
    console.log("Starting email sign-up process");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Add display name to the user profile
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }
    
    console.log("Sign-up successful");
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing up with email:", error);
    
    // Create a new error object with the code property preserved
    const customError: any = new Error('Authentication failed');
    customError.code = error.code;
    
    // Add a user-friendly message property
    if (error.code === 'auth/email-already-in-use') {
      customError.message = 'This email is already registered. Please use a different email or try logging in instead.';
    } else if (error.code === 'auth/weak-password') {
      customError.message = 'Password is too weak. Please use a stronger password.';
    } else if (error.code === 'auth/invalid-email') {
      customError.message = 'The email address is not valid.';
    } else if (error.code === 'auth/operation-not-allowed') {
      customError.message = 'Email/password accounts are not enabled. Please contact support.';
    } else {
      customError.message = error.message || 'An unexpected error occurred during signup.';
    }
    
    // Throw the enhanced error
    throw customError;
  }
};

/**
 * Sign in with email and password
 * @param email User's email
 * @param password User's password
 * @returns User object if sign in is successful
 */
export const signInWithEmail = async (
  email: string, 
  password: string
): Promise<User | null> => {
  try {
    console.log("Starting email sign-in process");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Sign-in successful");
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with email:", error);
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