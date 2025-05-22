/**
 * This is a temporary mock authentication system
 * Use this until Firebase authentication is properly configured
 */

// Mock user type to match Firebase User interface
export interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

// Store user data in localStorage
const STORAGE_KEY = 'superhealthcare_auth_user';

// Get stored user from localStorage
export const getStoredUser = (): MockUser | null => {
  const storedUser = localStorage.getItem(STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

// Set user in localStorage
const setStoredUser = (user: MockUser | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

// Mock registration
export const mockSignUp = async (
  email: string,
  password: string,
  displayName: string
): Promise<MockUser> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Create mock user
  const newUser: MockUser = {
    uid: `user_${Date.now()}`,
    email,
    displayName,
    photoURL: null,
    emailVerified: false
  };
  
  // Store in localStorage
  setStoredUser(newUser);
  return newUser;
};

// Mock login
export const mockSignIn = async (
  email: string,
  password: string
): Promise<MockUser> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For simplicity, this mock system accepts any credentials
  // In a real system, we would validate credentials against stored values
  
  // Get existing user or create new one
  const existingUser = getStoredUser();
  if (existingUser && existingUser.email === email) {
    return existingUser;
  }
  
  // If no matching user, create a new one (in real auth, this would be an error)
  const newUser: MockUser = {
    uid: `user_${Date.now()}`,
    email,
    displayName: email.split('@')[0], // Simple display name from email
    photoURL: null,
    emailVerified: false
  };
  
  setStoredUser(newUser);
  return newUser;
};

// Mock sign out
export const mockSignOut = async (): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Clear stored user
  setStoredUser(null);
};

// Mock auth state change listener
export const onAuthStateChange = (callback: (user: MockUser | null) => void): (() => void) => {
  // Initial call with current user
  callback(getStoredUser());
  
  // Set up storage event listener to handle changes from other tabs
  const listener = () => {
    callback(getStoredUser());
  };
  
  window.addEventListener('storage', listener);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('storage', listener);
  };
};