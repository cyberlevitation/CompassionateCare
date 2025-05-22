import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

export interface UserPreferences {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  marketingEmails?: boolean;
}

export interface AuthUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  preferences?: UserPreferences;
  phone?: string;
  address?: string;
  city?: string;
  postcode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  medicalConditions?: string;
  allergies?: string;
  medications?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Convert Firebase user to our application user model
const mapFirebaseUserToAuthUser = (firebaseUser: FirebaseUser | null): AuthUser | null => {
  if (!firebaseUser) return null;
  
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || undefined,
    firstName: firebaseUser.displayName?.split(' ')[0] || undefined,
    lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || undefined,
    profileImageUrl: firebaseUser.photoURL || undefined
  };
};

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  
  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setLoading(false);
      
      // If user logs in or out, refetch user profile data
      if (user) {
        // Get token for API calls
        const token = await user.getIdToken();
        
        // Store token in localStorage to use in API requests
        localStorage.setItem('authToken', token);
        
        // Reset queries to trigger refetch with new auth state
        queryClient.invalidateQueries();
      } else {
        // Remove token when logged out
        localStorage.removeItem('authToken');
        
        // Clear any user data in cache
        queryClient.clear();
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [queryClient]);
  
  // Map Firebase user to our application user model
  const authUser = mapFirebaseUserToAuthUser(firebaseUser);
  
  // Fetch additional user profile data from our backend if user is authenticated
  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['userProfile', authUser?.id],
    queryFn: async () => {
      if (!authUser) return null;
      
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) return authUser;
        const data = await response.json();
        return { ...authUser, ...data };
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return authUser;
      }
    },
    enabled: !!authUser,
  });
  
  const isLoading = loading || (!!authUser && isProfileLoading);
  
  return {
    user: userProfile || authUser,
    isLoading,
    isAuthenticated: !!authUser,
    firebaseUser
  };
}